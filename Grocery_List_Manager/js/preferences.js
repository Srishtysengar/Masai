import { loadJSON } from "./utils.js";

export let selectedPrefs = [];

export async function initPreferences() {
  const prefs = await loadJSON("./data/dietaryPreferences.json");
  const container = document.getElementById("preferenceCheckboxes");

  prefs.forEach(pref => {
    const wrapper = document.createElement("div");
    wrapper.className = "pref-item";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = `pref-${pref.id}`;
    cb.value = pref.id;

    cb.addEventListener("change", () => {
      if (cb.checked) {
        selectedPrefs.push(pref.id);
      } else {
        selectedPrefs = selectedPrefs.filter(p => p !== pref.id);
      }
    });

    const label = document.createElement("label");
    label.htmlFor = cb.id;
    label.textContent = pref.label;

    wrapper.append(cb, label);
    container.append(wrapper);
  });
}


export function filterByPreferences(recipes = []) {
  if (selectedPrefs.length === 0) return recipes;
  return recipes.filter(r =>
    r.dietaryTags &&
    selectedPrefs.every(tag => r.dietaryTags.includes(tag))
  );
}
