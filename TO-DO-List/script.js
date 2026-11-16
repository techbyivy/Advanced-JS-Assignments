const taskInput = document.getElementById("task");
const addTaskBtn = document.querySelector(".btn")
const taskList = document.getElementById("taskList")
const taskCount = document.getElementById("taskCount");
const completeTask = document.getElementById("completeTask");

function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") {
        alert("Please enter a task!!")
        return;
    }
    const taskItem = document.createElement("div")
    taskItem.className = "task"
    const taskTextElement = document.createElement("span");

    taskTextElement.textContent = taskText;
    const actionContainer = document.createElement("div");
    actionContainer.className = "action-container";


    //update task
    const markAsDoneBtn = document.createElement("button");
    markAsDoneBtn.textContent = "Mark as Done";
    markAsDoneBtn.className = "btn secondary"
    markAsDoneBtn.addEventListener("click", function () {
        taskTextElement.classList.toggle("completed")
        updateCompleteTask()
    })

    //delete task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "btn danger"
    deleteBtn.addEventListener("click", function () {       
        taskItem.remove();
        updateTaskCount()
    })

    actionContainer.appendChild(markAsDoneBtn)
    actionContainer.appendChild(deleteBtn)

    //taskItem.textContent = taskText;
    taskItem.appendChild(taskTextElement);
    //taskItem.appendChild(markAsDoneBtn)
    //taskItem.appendChild(deleteBtn)
    taskItem.appendChild(actionContainer)
    taskList.appendChild(taskItem)
    updateTaskCount()
    taskInput.value = ""
}

//update task counter
function updateTaskCount() {
 taskCount.textContent = taskList.children.length;
}

//update completed task
function updateCompleteTask(){
    let completedTasks = document.querySelectorAll(".completed")
    completeTask.textContent = completedTasks.length
}

addTaskBtn.addEventListener("click", addTask)