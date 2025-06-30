const apiURL = 'https://68618ba48e74864084465a62.mockapi.io/users'; // Replace with your actual endpoint

const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userList = document.getElementById("userList");
const message = document.getElementById("message");

// Fetch and display all users
async function loadUsers() {
  try {
    const res = await fetch(apiURL);
    const users = await res.json();
    userList.innerHTML = "";
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
      userList.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    showMessage("Error loading users", "error");
  }
}

// Handle form submission
userForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    showMessage("Please fill in all fields", "error");
    return;
  }

  // Check for duplicate email
  try {
    const res = await fetch(apiURL);
    const users = await res.json();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      showMessage("Email already registered!", "error");
      return;
    }

    // Submit new user
    const postRes = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    if (!postRes.ok) throw new Error("Failed to add user");

    showMessage("User added successfully!", "success");
    userForm.reset();
    loadUsers(); // refresh list

  } catch (error) {
    console.error(error);
    showMessage("Failed to add user", "error");
  }
});

// Display messages
function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}

// Initial load
loadUsers();
