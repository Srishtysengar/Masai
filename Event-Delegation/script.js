// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const incompleteCount = document.getElementById("incompleteCount");

const showAll = document.getElementById("showAll");
const showCompleted = document.getElementById("showCompleted");
const showIncomplete = document.getElementById("showIncomplete");
const sortAlpha = document.getElementById("sortAlpha");

// Task Array
let tasks = [];
let filterMode = "all"; // "all", "completed", "incomplete"
let isSorted = false;

// Adding Task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
});

// Event Delegation for Checkbox & Delete
taskList.addEventListener("click", (e) => {
  const id = Number(e.target.closest("li")?.dataset?.id);
  if (!id) return;

  if (e.target.classList.contains("deleteBtn")) {
    tasks = tasks.filter(task => task.id !== id); // HOF: filter
  }

  if (e.target.classList.contains("toggleCheckbox")) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ); // HOF: map
  }

  renderTasks();
});

// Rendering Tasks
function renderTasks() {
  let displayTasks = [...tasks];

  // Filtering logic
  if (filterMode === "completed") {
    displayTasks = displayTasks.filter(task => task.completed);
  } else if (filterMode === "incomplete") {
    displayTasks = displayTasks.filter(task => !task.completed);
  }

  // Sorting logic
  if (isSorted) {
    displayTasks.sort((a, b) => a.text.localeCompare(b.text)); // HOF: sort
  }

  // Clearing List
  taskList.innerHTML = "";

  // Rendering List
  displayTasks.forEach(task => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <input type="checkbox" class="toggleCheckbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);
  });

  updateCounters();
}

// Updateing the Counters
function updateCounters() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(task => task.completed).length;
  incompleteCount.textContent = tasks.filter(task => !task.completed).length;
}

// Filtering Buttons
showAll.addEventListener("click", () => {
  filterMode = "all";
  renderTasks();
});

showCompleted.addEventListener("click", () => {
  filterMode = "completed";
  renderTasks();
});

showIncomplete.addEventListener("click", () => {
  filterMode = "incomplete";
  renderTasks();
});

// Sorting Button
sortAlpha.addEventListener("click", () => {
  isSorted = !isSorted;
  renderTasks();
});
