import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const RECIPES_URL = [
    {
      "name": "Tomato Pasta",
      "ingredients": ["Tomato", "Pasta", "Olive Oil", "Garlic"],
      "dietaryTags": ["vegetarian"]
    },
    {
      "name": "Chicken Salad",
      "ingredients": ["Chicken Breast", "Lettuce", "Tomato", "Cucumber", "Olive Oil"],
      "dietaryTags": []
    },
    {
      "name": "Vegan Stir Fry",
      "ingredients": ["Broccoli", "Carrot", "Bell Pepper", "Soy Sauce"],
      "dietaryTags": ["vegan", "gluten-free"]
    },
    {
      "name": "Gluten-Free Pancakes",
      "ingredients": ["Gluten-Free Flour", "Egg", "Milk", "Baking Powder"],
      "dietaryTags": ["gluten-free", "vegetarian"]
    }
]   

const groceryRef   = collection(db, "groceryList");

export async function fetchRecipes() {
  return RECIPES_URL;
}

export async function suggestRecipes(availableItems = []) {
  const recipes = await fetchRecipes();
  const have = availableItems.map(i => i.toLowerCase());
  return recipes.filter(recipe =>
    recipe.ingredients.every(ing => have.includes(ing.toLowerCase()))
  );
}

export async function addRecipeIngredientsToList(recipe) {
  const snapshot = await getDocs(groceryRef);
  const existing = snapshot.docs.map(d => d.data().name.toLowerCase());

  const toAdd = recipe.ingredients.filter(ing =>
    !existing.includes(ing.toLowerCase())
  );

  await Promise.all(
    toAdd.map(ing => addDoc(groceryRef, { name: ing }))
  );
}
