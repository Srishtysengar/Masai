const input = document.getElementById("itemInput");
const list = document.getElementById("itemList");
const emptyMessage = document.getElementById("emptyMessage");

let items = [];

// Loading from localStorage on page load
window.onload = () => {
  const stored = localStorage.getItem("myItems");
  if (stored) {
    items = JSON.parse(stored);
    renderList();
  } else {
    showEmptyMessage();
  }
};

// Adding item to list
function addItem() {
  const newItem = input.value.trim();
  if (newItem === "") return;

  items.push(newItem);
  input.value = "";
  updateLocalStorage();
  renderList();
}

// Rendering list items
function renderList() {
  list.innerHTML = "";

  if (items.length === 0) {
    showEmptyMessage();
    return;
  }

  emptyMessage.textContent = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// Saveing list to localStorage
function updateLocalStorage() {
  localStorage.setItem("myItems", JSON.stringify(items));
}

// Clearing all items
function clearAll() {
  items = [];
  updateLocalStorage();
  renderList();
}

// Showing message if list is empty
function showEmptyMessage() {
  emptyMessage.textContent = "No items added yet.";
}
