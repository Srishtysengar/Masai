const API_URL = "https://jsonplaceholder.typicode.com/users";
const productContainer = document.getElementById("productContainer");
const sortSelect = document.getElementById("sortSelect");

async function fetchAndDisplayUsers(sortOrder = "") {
  try {
    productContainer.innerHTML = "<p>Loading...</p>";
    let url = API_URL;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch users");

    let data = await res.json();

    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderUsers(data);
  } catch (error) {
    productContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    console.error(error);
  }
}

function renderUsers(users) {
  productContainer.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    `;
    productContainer.appendChild(card);
  });
}

sortSelect.addEventListener("change", () => {
  const selected = sortSelect.value;
  fetchAndDisplayUsers(selected);
});

fetchAndDisplayUsers();
