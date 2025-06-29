document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!name || !email || !password) {
    message.textContent = "All fields are required!";
    message.className = "error";
    return;
  }

  try {
    const res = await fetch("https://mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    message.textContent = "✅ Registration successful!";
    message.className = "success";

    
    document.getElementById("registrationForm").reset();

  } catch (err) {
    message.textContent = `❌ ${err.message}`;
    message.className = "error";
  }
});
