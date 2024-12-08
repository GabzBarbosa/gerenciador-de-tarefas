const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadLine');

function openModal() {
    $modal.style.display = "flex";
}

function closeModal() {
    $modal.style.display = "none";
}

function createTask() {
    console.log($descriptionInput.value);
    console.log($priorityInput.value);
    console.log($deadLineInput.value);

    closeModal();
}