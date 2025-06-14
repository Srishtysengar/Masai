import { loadJSON } from "./utils.js";

export async function fetchDeals() {
  try {
    const deals = await loadJSON("./data/coupons.json");
    const list  = document.getElementById("dealsList");
    list.innerHTML = ""; // clear old entries

    deals.forEach(d => {
      const li = document.createElement("li");
      li.textContent = `${d.item}: ${d.discount}% off`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("❌ Error loading deals:", err);
  }
}
