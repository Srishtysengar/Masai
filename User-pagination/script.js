const API_URL = "https://jsonplaceholder.typicode.com/users";
const LIMIT = 6;
const TOTAL_USERS = 10; 
const TOTAL_PAGES = Math.ceil(TOTAL_USERS / LIMIT);

const userContainer = document.getElementById("userContainer");
const paginationContainer = document.getElementById("paginationContainer");

function createUserCard(user) {
  const div = document.createElement("div");
  div.className = "user-card";
  div.innerHTML = `
    <strong>${user.name}</strong><br/>
    Username: ${user.username}<br/>
    Email: ${user.email}<br/>
    City: ${user.address.city}
  `;
  return div;
}

async function fetchUsers(page) {
  try {
    userContainer.innerHTML = "<p>Loading...</p>";
    const res = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    userContainer.innerHTML = ""; 

    if (data.length === 0) {
      userContainer.innerHTML = "<p>No users found on this page.</p>";
      return;
    }

    data.forEach(user => {
      const card = createUserCard(user);
      userContainer.appendChild(card);
    });

    highlightActivePage(page);
  } catch (error) {
    userContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    console.error(error);
  }
}

function createPaginationButtons() {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => fetchUsers(i));
    paginationContainer.appendChild(btn);
  }
}

function highlightActivePage(activePage) {
  const buttons = paginationContainer.querySelectorAll("button");
  buttons.forEach((btn, index) => {
    btn.classList.toggle("active-page", index + 1 === activePage);
  });
}

createPaginationButtons();
fetchUsers(1);
