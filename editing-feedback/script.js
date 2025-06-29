const form = document.getElementById('feedbackForm');
const editForm = document.getElementById('editForm');
const statusMessage = document.getElementById('statusMessage');
const tableBody = document.querySelector('#feedbackTable tbody');
const editSection = document.getElementById('editSection');

const firebaseUrl = "https://editingfeedback-9d1cb-default-rtdb.asia-southeast1.firebasedatabase.app/feedback";


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();

  const data = { username, message, timestamp: new Date().toISOString() };

  try {
    const res = await fetch(`${firebaseUrl}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to submit");

    statusMessage.textContent = "✅ Feedback submitted!";
    statusMessage.style.color = "green";
    form.reset();
    loadFeedback();

  } catch (err) {
    statusMessage.textContent = "❌ Error: " + err.message;
    statusMessage.style.color = "red";
  }
});


async function loadFeedback() {
  tableBody.innerHTML = "";
  const res = await fetch(`${firebaseUrl}.json`);
  const feedbackData = await res.json();

  if (feedbackData) {
    Object.entries(feedbackData).forEach(([id, entry]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.username}</td>
        <td>${entry.message}</td>
        <td>
          <button onclick="editFeedback('${id}', '${entry.username}', \`${entry.message.replace(/`/g, '\\`')}\`)">Edit</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }
}


window.editFeedback = function(id, username, message) {
  document.getElementById('editUsername').value = username;
  document.getElementById('editMessage').value = message;
  editSection.style.display = "block";

 
  editForm.onsubmit = async function(e) {
    e.preventDefault();
    const updatedUsername = document.getElementById('editUsername').value.trim();
    const updatedMessage = document.getElementById('editMessage').value.trim();

    const updatedData = { username: updatedUsername, message: updatedMessage };

    try {
      const res = await fetch(`${firebaseUrl}/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      if (!res.ok) throw new Error("Failed to update feedback");

      editSection.style.display = "none";
      loadFeedback();
      statusMessage.textContent = "✅ Feedback updated!";
      statusMessage.style.color = "green";
    } catch (err) {
      statusMessage.textContent = "❌ Error updating: " + err.message;
      statusMessage.style.color = "red";
    }
  };

  document.getElementById('cancelEdit').onclick = () => {
    editSection.style.display = "none";
  };
};


loadFeedback();
