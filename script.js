const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadLine');
const $idInput = document.getElementById('idImput');

const $todoColumnBody = document.querySelector('#todoColumn .body');

var todoList = [];

function openModal(id) {
    $modal.style.display = "flex";

    if (id) {
        const index = todoList.findIndex(function(task) {
            return task.id = id;
        });

        const task = todoList[index];

        $idInput.value = task.id;
        $descriptionInput.value = task.description;
        $priorityInput.value = task.priority;
        $deadLineInput.value = task.deadline;
        
    }
}

function closeModal() {
    $modal.style.display = "none";

    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = "";

}


function generateCards() {
    const todoListHtml = todoList.map(function (task) {
       
        return `
       <div class="card" ondblclick="openModal(${task.id})">
        <div class="info">
        <b>Descrição:</b>
        <span>${task.description}</span>

        </div>

        <div class="info">
        <b>Prioridade:</b>
        <span>${task.priority}</span>

        </div>
        
        <div class="info">
        <b>Prazo:</b>
        <span>${task.deadline}</span>

        </div>
    </div>
        `;
    })

    $todoColumnBody.innerHTML = todoListHtml.join('');

}


function createTask() {
    const newTask = {
        id: Math.floor(Math.random() * 9999999),
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadline: $deadLineInput.value,
    }

    todoList.push(newTask);

    closeModal();
    generateCards();


}
