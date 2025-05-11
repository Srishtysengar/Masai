// Selecting elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Adding event listener to Add Task button
addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();

  // Edge case: Prevent adding empty tasks
  if (taskText === '') {
    alert('Task cannot be empty!');
    return;
  }

  // Creating new <li> element
  const li = document.createElement('li');

  // Creating span to hold task text
  const span = document.createElement('span');
  span.textContent = taskText;

  // Creating Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', function () {
    span.classList.toggle('completed');
  });

  // Creating Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function () {
    li.remove();
  });

  // Append everything to <li>
  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  // Add <li> to the task list
  taskList.appendChild(li);

  // Clear input field
  taskInput.value = '';
});
