import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const pantryRef = collection(db, "pantryItems");

export async function addPantryItem(name, quantity = 1, expiration = null) {
  try {
    const itemData = {
      name,
      quantity,
      addedAt: Timestamp.now(),
    };

    if (expiration) {
      itemData.expiration = Timestamp.fromDate(new Date(expiration));
    }

    await addDoc(pantryRef, itemData);
    console.log(`✅ Pantry item "${name}" added`);
  } catch (error) {
    console.error("❌ Error adding pantry item:", error);
  }
}

export async function getPantryItems() {
  try {
    const snapshot = await getDocs(pantryRef);
    const items = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: docSnap.id,
        name: data.name,
        quantity: data.quantity,
        expiration: data.expiration?.toDate() || null,
      });
    });

    return items;
  } catch (error) {
    console.error("❌ Error fetching pantry items:", error);
    return [];
  }
}

export async function deletePantryItem(id) {
  try {
    await deleteDoc(doc(pantryRef, id));
    console.log(`🗑️ Pantry item deleted: ${id}`);
  } catch (error) {
    console.error("❌ Error deleting pantry item:", error);
  }
}
