// js/history.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, Timestamp } 
  from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

export async function recordPurchase(items = []) {
  if (!items.length) return;
  const total = items.reduce((sum, i) => sum + (parseFloat(i.price)||0), 0);
  await addDoc(collection(db, "shoppingHistory"), {
    items,
    total,
    createdAt: Timestamp.now()
  });
}

export async function renderHistory() {
  const tbody = document.querySelector("#historyTable tbody");
  tbody.innerHTML = "";
  const snap = await getDocs(collection(db, "shoppingHistory"));
  const sessions = snap.docs
    .map(d => ({ id: d.id, ...(d.data()) }))
    .sort((a,b) => b.createdAt.seconds - a.createdAt.seconds);

  sessions.forEach(s => {
    const date = s.createdAt.toDate().toLocaleString();
    const count = s.items.length;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${date}</td>
      <td>${count}</td>
      <td>$${s.total.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}
