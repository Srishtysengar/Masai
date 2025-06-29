const firebaseBaseUrl = "https://fixingcode-a6176-default-rtdb.asia-southeast1.firebasedatabase.app/users";
const tableBody = document.querySelector("#userTable tbody");
const statusMessage = document.getElementById("statusMessage");


async function loadUsers() {
  try {
    const res = await fetch(`${firebaseBaseUrl}.json`);
    const data = await res.json();

    tableBody.innerHTML = ""; 

    if (data) {
      Object.entries(data).forEach(([key, user]) => {
        const row = document.createElement("tr");
        row.id = `row-${key}`;
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><button onclick="deleteUser('${key}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = "<tr><td colspan='3'>No users found.</td></tr>";
    }
  } catch (err) {
    statusMessage.textContent = "❌ Failed to load users: " + err.message;
    statusMessage.style.color = "red";
  }
}

// fixed code
const deleteUser = (key) => {
  const url = `${firebaseBaseUrl}/${key}.json`;

  fetch(url, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) throw new Error("Delete failed");

    // ✅ Remove the row from table
    const row = document.getElementById(`row-${key}`);
    if (row) row.remove();

    statusMessage.textContent = "✅ User deleted successfully";
    statusMessage.style.color = "green";
  })
  .catch(error => {
    statusMessage.textContent = "❌ Error deleting user: " + error.message;
    statusMessage.style.color = "red";
  });
};

window.onload = loadUsers;
