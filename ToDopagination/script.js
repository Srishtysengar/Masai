const API_URL = "https://jsonplaceholder.typicode.com/todos";
const todosPerPage = 10;
let todos = [];

const todoContainer = document.getElementById("todoContainer");
const paginationContainer = document.getElementById("paginationContainer");

async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    todos = await response.json();
    createPaginationButtons();
    renderTodos(1);
  } catch (error) {
    todoContainer.innerHTML = "<p>Error fetching todos</p>";
    console.error("Fetch Error:", error);
  }
}

function renderTodos(page) {
  todoContainer.innerHTML = ""; 
  const startIndex = (page - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const todosToShow = todos.slice(startIndex, endIndex);

  todosToShow.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = `${todo.id}. ${todo.title}`;
    todoContainer.appendChild(div);
  });
}


function createPaginationButtons() {
  const totalPages = Math.ceil(todos.length / todosPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => renderTodos(i));
    paginationContainer.appendChild(btn);
  }
}


