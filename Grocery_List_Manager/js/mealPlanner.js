
import { loadJSON } from "./utils.js";
import { addRecipeIngredientsToList } from "./recipes.js";


export async function generateShoppingFromPlan() {
  try {
    const plans = await loadJSON("./data/mealPlans.json");
    if (!plans.length) return;
    const weekPlan = plans[0].plan;      

   
    const all = await loadJSON("./data/sampleRecipes.json");
    const map = Object.fromEntries(all.map(r => [r.name, r]));

    
    for (const { recipe } of weekPlan) {
      const r = map[recipe];
      if (r) await addRecipeIngredientsToList(r);
    }
  } catch (err) {
    console.error("❌ MealPlanner error:", err);
  }
}
