// Task array
let tasks = [];

// Add Task function
const addTask = () => {
    const title = document.getElementById("task-title").value;
    const status = document.getElementById("task-status").value;
    const priority = parseInt(document.getElementById("task-priority").value);

    if (!title || isNaN(priority) || priority < 1 || priority > 5) {
        alert("Please enter valid task details!");
        return;
    }

    const task = { title, status, priority };
    tasks.push(task);
    displayTasks();
};

// Filter tasks by status
const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
};

// Find the first high-priority task
const findHighPriorityTask = () => {
    return tasks.find(task => task.priority === 5);
};

// Display tasks in the task list
const displayTasks = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.map(task => {
        const listItem = document.createElement("li");
        listItem.textContent = `Task: ${task.title}, Status: ${task.status}, Priority: ${task.priority}`;
        taskList.appendChild(listItem);
    });
};

// Event listener for adding tasks
document.getElementById("add-task-btn").addEventListener("click", addTask);
