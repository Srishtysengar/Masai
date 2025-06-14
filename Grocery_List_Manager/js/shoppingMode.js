
import { sortByStoreSection } from "./utils.js";

export async function enterShoppingMode(items = []) {
  const container = document.getElementById("shoppingChecklist");
  container.innerHTML = "";

  const sorted = await sortByStoreSection(items);
  sorted.forEach(name => {
    const wrapper = document.createElement("div");
    wrapper.className = "shop-item";
    wrapper.innerHTML = `
      <label>
        <input type="checkbox" />
        ${name}
      </label>
    `;
    container.appendChild(wrapper);
  });
}


export function exitShoppingMode() {
  const container = document.getElementById("shoppingChecklist");
  container.innerHTML = "";
}
