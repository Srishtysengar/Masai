import { loadJSON }    from "./utils.js";
import { getPantryItems } from "./pantry.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { db }          from "./firebase.js";

export async function fetchNutrition() {
  const data = await loadJSON("./data/nutritionData.json");

  const pantrySnap  = await getPantryItems();
  const pantryItems = pantrySnap.map(i => i.name);
  const grocerySnap = await getDocs(collection(db, "groceryList"));
  const groceryItems = grocerySnap.docs.map(d => d.data().name);
  const allItems    = [...new Set([...pantryItems, ...groceryItems])];

  let totalCal   = 0,
      totalProt  = 0,
      totalCarbs = 0,
      totalFat   = 0;

  allItems.forEach(name => {
    const nut = data[name];
    if (nut) {
      totalCal   += nut.calories;
      totalProt  += nut.protein;
      totalCarbs += nut.carbs;
      totalFat   += nut.fat;
    }
  });

  const out = document.getElementById("nutritionSummary");
  out.textContent = `
    Calories: ${totalCal.toFixed(0)} |
    Protein: ${totalProt.toFixed(1)}g |
    Carbs: ${totalCarbs.toFixed(1)}g |
    Fat: ${totalFat.toFixed(1)}g
  `.replace(/\s+/g, " ").trim();
}
