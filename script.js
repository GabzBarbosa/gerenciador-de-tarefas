const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadLine');

const $todoColumnBody = document.querySelector('#todoColumn .body');

var todoList = [];

function openModal() {
    $modal.style.display = "flex";
}

function closeModal() {
    $modal.style.display = "none";
}


function generateCards() {
    const todoListHtml = todoList.map(function (task) {
        return `
       <div class="card">
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
        `
    })

    $todoColumnBody.innerHTML = todoListHtml.join('');

}

function createTask() {
    const newTask = {
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadline: $deadLineInput.value,
    }

    todoList.push(newTask);

    closeModal();
    generateCards();


}
