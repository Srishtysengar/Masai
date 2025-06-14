import { getPantryItems } from "./pantry.js";

export async function checkExpirations() {
  const alerts = document.getElementById("expirationAlerts");
  alerts.innerHTML = "";

  const items = await getPantryItems();
  const now   = Date.now();

  items.forEach(i => {
    if (i.expiration) {
      const diff = i.expiration.getTime() - now;
      if (diff <= 2 * 24 * 60 * 60 * 1000) {
        const li = document.createElement("li");
        li.textContent = `${i.name} expires on ${i.expiration.toLocaleDateString()}`;
        alerts.appendChild(li);
      }
    }
  });
}
