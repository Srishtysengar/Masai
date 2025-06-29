const form = document.getElementById('feedbackForm');
const statusMessage = document.getElementById('statusMessage');

const firebaseUrl = "https://feedback-8ec9c-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"; 

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!username || !message) {
    statusMessage.textContent = "Please fill in both fields.";
    statusMessage.style.color = "red";
    return;
  }

  const feedbackData = {
    username,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedbackData)
    });

    if (!res.ok) throw new Error("Failed to send feedback");

    statusMessage.textContent = "✅ Feedback submitted successfully!";
    statusMessage.style.color = "green";
    form.reset();

  } catch (error) {
    statusMessage.textContent = "❌ Error: " + error.message;
    statusMessage.style.color = "red";
  }
});
