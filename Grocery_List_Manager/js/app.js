// js/app.js

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  addPantryItem,
  getPantryItems,
  deletePantryItem,
} from "./pantry.js";

import {
  suggestRecipes,
  addRecipeIngredientsToList,
  fetchRecipes,
} from "./recipes.js";

import {
  initPreferences,
  filterByPreferences,
} from "./preferences.js";

import { fetchDeals } from "./deals.js";

import { generateShoppingFromPlan } from "./mealPlanner.js";

import { enterShoppingMode, exitShoppingMode } from "./shoppingMode.js";

import { checkExpirations } from "./expiration.js";

import { fetchNutrition } from "./nutrition.js";

import { recordPurchase, renderHistory } from "./history.js";

import { renderBudget, setBudget } from "./budget.js";

document.addEventListener("DOMContentLoaded", () => {
  initPreferences();    
  fetchDeals();        
  renderHistory();     

  const groceryRef    = collection(db, "groceryList");
  const groceryListEl = document.getElementById("groceryList");
  const itemInput     = document.getElementById("itemInput");
  const addBtn        = document.getElementById("addBtn");

  addBtn.addEventListener("click", async () => {
    const name = itemInput.value.trim();
    if (!name) return;
    await addDoc(groceryRef, { name });
    itemInput.value = "";
    await renderGrocery();
  });

  async function renderGrocery() {
    groceryListEl.innerHTML = "";
    const snap = await getDocs(groceryRef);

    snap.forEach((docSnap) => {
      const { name } = docSnap.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${name}</span>
        <input
          type="number"
          min="0"
          step="0.01"
          class="item-price"
          placeholder="0.00"
        />
        <button class="del-item" data-id="${docSnap.id}">❌</button>
      `;
      groceryListEl.appendChild(li);
    });

    groceryListEl.querySelectorAll(".del-item").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await deleteDoc(doc(groceryRef, btn.dataset.id));
        await renderGrocery();
      });
    });

    groceryListEl.querySelectorAll(".item-price").forEach((input) => {
      input.addEventListener("input", () => {
        renderBudget();
        fetchNutrition();
      });
    });

    renderBudget();
    fetchNutrition();
  }

  renderGrocery();


  const budgetInput = document.getElementById("budgetInput");
  budgetInput.addEventListener("input", () => {
    setBudget(parseFloat(budgetInput.value) || 0);
  });


  const pantryForm = document.getElementById("pantryForm");
  const pantryList = document.getElementById("pantryList");

  pantryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name   = document.getElementById("pantryItem").value.trim();
    const qty    = Number(document.getElementById("pantryQty").value);
    const expiry = document.getElementById("pantryExpiry").value;
    if (!name || qty < 1) return;
    await addPantryItem(name, qty, expiry);
    pantryForm.reset();
    await renderPantry();
  });

  async function renderPantry() {
    pantryList.innerHTML = "";
    const items = await getPantryItems();

    items.forEach((i) => {
      const expText = i.expiration
        ? ` (Exp: ${i.expiration.toLocaleDateString()})`
        : "";
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${i.name} — Qty: ${i.quantity}${expText}</span>
        <button class="pantry-del" data-id="${i.id}">❌</button>
      `;
      pantryList.appendChild(li);
    });

    pantryList.querySelectorAll(".pantry-del").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await deletePantryItem(btn.dataset.id);
        await renderPantry();
      });
    });


    fetchNutrition();
  }

  renderPantry();


  const suggestBtn  = document.getElementById("suggestRecipesBtn");
  const recipeCards = document.getElementById("recipeCards");

  suggestBtn.addEventListener("click", async () => {
    recipeCards.innerHTML = "";

  
    const pantryItems = (await getPantryItems()).map((i) => i.name);
    const snap         = await getDocs(groceryRef);
    const groceryItems = snap.docs.map((d) => d.data().name);
    const available    = [...new Set([...pantryItems, ...groceryItems])];

  
    let recipes = await suggestRecipes(available);
    recipes     = filterByPreferences(recipes);

    if (!recipes.length) {
      recipeCards.innerHTML = `<p>No matching recipes found.</p>`;
      return;
    }

    recipes.forEach((r) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <h3>${r.name}</h3>
        <p><strong>Ingredients:</strong> ${r.ingredients.join(", ")}</p>
        <button class="add-missing">Add Missing Ingredients</button>
      `;
      card.querySelector(".add-missing").addEventListener("click", async () => {
        await addRecipeIngredientsToList(r);
        await renderGrocery();
        alert(`Missing ingredients for "${r.name}" added to your list.`);
      });
      recipeCards.appendChild(card);
    });
  });

  document.getElementById("generateListFromPlan").addEventListener("click", async () => {
    await generateShoppingFromPlan();
    await renderGrocery();
  });

  document.getElementById("enterShoppingMode").addEventListener("click", async () => {
    const snap = await getDocs(groceryRef);
    const items = snap.docs.map((d) => d.data().name);
    enterShoppingMode(items);
  });


  checkExpirations();


 
  document.getElementById("recordPurchaseBtn").addEventListener("click", async () => {
    const rows = groceryListEl.querySelectorAll("li");
    const items = Array.from(rows).map((li) => ({
      name: li.querySelector("span").textContent,
      price: li.querySelector(".item-price").value || 0,
    }));
    await recordPurchase(items);
    alert("🛒 Purchase recorded!");
    renderHistory();
  });

  fetchNutrition();
});
