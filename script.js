const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');


// Carregar as tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);

// Adiciona nova tarefa
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value.trim();
    const taskDeadline = document.getElementById('task-deadline').value;

    if (!taskName) {
        alert('O campo "Digite a tarefa" não pode estar vazio.');
        return;
    }

    if (new Date(taskDeadline) < new Date(taskDeadline)) {
        alert('A data de prazo não pode ser no passado!');
        return;
    }

    addTask(taskName, taskDeadline);
    saveTask(taskName, taskDeadline);
    taskForm.reset();
});

// Função para adicionar tarefas na li

function addTask(taskName, taskDeadline) {
    const taskItem = document.createElement('li');

    const daysUntilDeadline = calculateDaysUntilDeadline();
    let warning = '';
    if (daysUntilDeadline <= 2 && daysUntilDeadline >= 0) {
        warning = ' <strong>(Atenção: Faltam menos de 2 dias!)</strong>';
    }

    taskItem.innerHTML = `
        <input type="checkbox" class="task-select">
        <span class="task-name">${taskName}</span>
        <span class="task-sla"> - ${daysUntilDeadline} dias até o prazo</span>
        ${warning}
        `;

    taskList.appendChild(taskItem);

}

// Calcular quantos dias faltam até o prazo
function calculateDaysUntilDeadline(deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - currentDate;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Salvar a ordem atual das tarefas no localStorage
function saveCurrentOrder() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskName = taskItem.querySelector('.task-name').textContent.trim();
        const taskDeadline = taskItem.querySelector('.task-sla').textContent.split(' ')[1];
        tasks.push({ name: taskName, deadline: taskDeadline });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.name, task.Deadline));
}

// Editar as tarefas 
function editAllSelect() {
    const selectedTasks = document.querySelectorAll('.task-select:checked');
    selectedTasks.forEach(taskCheckbox => {
        const taskItem = taskCheckbox.parentElement;
        const taskName = taskItem.querySelector('.task-name').textContent;
        const newName = prompt('Edite o nome da tarefa:', taskName);

        if (newName) {
            taskItem.querySelector('.task-name').textContent = newName;
        }
    });
    saveCurrentOrder();
}

// Marcar as tarefas como concluídas
function completeAllSelect() {
    const selectedTasks = document.querySelectorAll('.task-select:checked');
    selectedTasks.forEach(taskCheckbox => {
        const taskItem = taskCheckbox.parentElement;
        taskItem.querySelector('.task-name').classList.toggle('completed');
    });
    saveCurrentOrder();
}

// Excluir as tarefas selecionadas
function deleteAllSelected() {
    const selectedTasks = document.querySelectorAll('.task-select:checked');
    selectedTasks.forEach(taskCheckbox => {
        const taskItem = taskCheckbox.parentElement;
        taskItem.remove();
    });
    saveCurrentOrder();
}
