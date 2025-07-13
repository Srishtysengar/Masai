const uid = localStorage.getItem("uid");
if (!uid && window.location.pathname.includes("dashboard.html")) {
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("uid");
  window.location.href = "index.html";
});