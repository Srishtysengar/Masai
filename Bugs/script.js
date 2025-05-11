// Get references to DOM elements
const addTaskButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Handle adding a new task
addTaskButton.onclick = function () {
  const taskText = taskInput.value.trim();

  // Prevent adding empty tasks
  if (taskText === "") return;

  // Create a new <li> element
  const newTask = document.createElement('li');
  newTask.textContent = taskText;

  // Append the new task to the task list
  taskList.appendChild(newTask);

  // Clear the input field after adding
  taskInput.value = "";
};

// Handle task removal on click
taskList.onclick = function (e) {
  // Check if the clicked element is an <li>
  if (e.target.tagName === 'LI') {
    e.target.remove(); // Remove the clicked task
  }
};
