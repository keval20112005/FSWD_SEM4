// script.js

// Task Array to store the tasks
let tasks = [];

// Helper function to format time
function formatTime(minutes) {
  const now = new Date();
  const dueDate = new Date(now.getTime() + minutes * 60000); // Add minutes to current time
  return dueDate; // Return as Date object, not formatted string
}

// Add Task Function
function addTask(title, priority, dueTime) {
  const task = {
    title,
    priority,
    dueTime,  // Store in minutes
    id: Date.now(), // unique identifier for the task
    dueTimeFormatted: formatTime(dueTime), // Store the exact Date object
  };

  // Add task to the array
  tasks.push(task);
  sortTasksByPriority();
  displayTasks();
  scheduleReminder(task);
}

// Sort tasks by priority (1 is highest priority)
function sortTasksByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
}

// Filter tasks that are due within the next 10 minutes
function getTasksDueInNext10Minutes() {
  const now = new Date();
  const next10Minutes = now.getTime() + 10 * 60000; // current time + 10 minutes

  return tasks.filter(task => {
    const taskDueTime = task.dueTimeFormatted.getTime(); // Use the Date object directly
    return taskDueTime <= next10Minutes && taskDueTime >= now.getTime();
  });
}

// Display tasks in the task list
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add(getPriorityClass(task.priority));
    li.textContent = `${task.title} (Due: ${task.dueTimeFormatted.toLocaleTimeString()}, Priority: ${task.priority})`;
    taskList.appendChild(li);
  });

  // Display tasks due in the next 10 minutes
  displayNextTasksIn10Minutes();
}

// Display tasks due in the next 10 minutes
function displayNextTasksIn10Minutes() {
  const nextTasksList = document.getElementById("nextTasksList");
  nextTasksList.innerHTML = ""; // Clear current list

  const nextTasks = getTasksDueInNext10Minutes();

  if (nextTasks.length === 0) {
    nextTasksList.innerHTML = "<li>No tasks due in the next 10 minutes.</li>";
  } else {
    nextTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = `${task.title} (Due: ${task.dueTimeFormatted.toLocaleTimeString()}, Priority: ${task.priority})`;
      nextTasksList.appendChild(li);
    });
  }
}

// Get CSS class based on priority
function getPriorityClass(priority) {
  if (priority === 1) return "high-priority";
  if (priority === 2 || priority === 3) return "medium-priority";
  return "low-priority";
}

// Simulate reminder using setTimeout based on the dueTime
function scheduleReminder(task) {
  const currentTime = new Date().getTime();
  const taskDueTime = task.dueTimeFormatted.getTime(); // Use the Date object directly
  const delay = taskDueTime - currentTime;

  if (delay > 0) {
    setTimeout(() => {
      alert(`Reminder: ${task.title} is due now!`);
    }, delay);
  }
}

// Handle form submission
document.getElementById("addTaskButton").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value;
  const priority = parseInt(document.getElementById("taskPriority").value);
  const dueTime = parseInt(document.getElementById("taskDueTime").value);

  if (title && !isNaN(priority) && !isNaN(dueTime)) {
    addTask(title, priority, dueTime);
    document.getElementById("taskTitle").value = '';
    document.getElementById("taskPriority").value = '';
    document.getElementById("taskDueTime").value = '';
  } else {
    alert("Please fill in all fields with valid values.");
  }
});
