const taskInput = document.getElementById("task");
const addTaskBtn = document.querySelector(".btn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completeTask = document.getElementById("completeTask");

// 1. LOAD: get saved tasks, or start with an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 2. SAVE: convert the array to a string and store it
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Builds the DOM for ONE task object
function renderTask(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task";

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;
    if (task.completed) taskTextElement.classList.add("completed");

    const actionContainer = document.createElement("div");
    actionContainer.className = "action-container";

    // mark as done
    const markAsDoneBtn = document.createElement("button");
    markAsDoneBtn.textContent = "Mark as Done";
    markAsDoneBtn.className = "btn secondary";
    markAsDoneBtn.addEventListener("click", function () {
        task.completed = !task.completed;          // update the data
        taskTextElement.classList.toggle("completed"); // update the UI
        saveTasks();
        updateCounts();
    });

    // delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn danger";
    deleteBtn.addEventListener("click", function () {
        tasks = tasks.filter(t => t.id !== task.id); // remove from data
        taskItem.remove();                           // remove from UI
        saveTasks();
        updateCounts();
    });

    actionContainer.appendChild(markAsDoneBtn);
    actionContainer.appendChild(deleteBtn);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(actionContainer);
    taskList.appendChild(taskItem);
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!!");
        return;
    }

    const task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTask(task);
    updateCounts();
    taskInput.value = "";
}

// counts now come from the data, not the DOM
function updateCounts() {
    taskCount.textContent = tasks.length;
    completeTask.textContent = tasks.filter(t => t.completed).length;
}

addTaskBtn.addEventListener("click", addTask);

// 3. ON PAGE LOAD: rebuild the saved tasks
tasks.forEach(renderTask);
updateCounts();