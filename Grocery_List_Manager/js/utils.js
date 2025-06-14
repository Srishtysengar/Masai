/**
 * Load and parse a JSON file from the given path.
 * @param {string} path — relative or absolute URL to a .json file
 * @returns {Promise<any>}
 */
export async function loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return res.json();
  }
  
  import { db } from "./firebase.js";
  import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
  
  export async function sortByStoreSection(items = []) {
    const snap = await getDocs(collection(db, "storeSections"));
    const sectionsMap = {};
    snap.docs.forEach(docSnap => {
      sectionsMap[docSnap.id] = docSnap.data().items || [];
    });
  
    return items.slice().sort((a, b) => {
      const secA = findSection(a, sectionsMap);
      const secB = findSection(b, sectionsMap);
      if (secA < secB) return -1;
      if (secA > secB) return 1;
      return a.localeCompare(b);
    });
  }
  
  function findSection(item, sectionsMap) {
    const name = item.toLowerCase();
    for (const [section, list] of Object.entries(sectionsMap)) {
      if (list.some(i => i.toLowerCase() === name)) {
        return section;
      }
    }
    return "Others";
  }
  

  export function groupBy(array = [], keyFn) {
    return array.reduce((acc, val) => {
      const key = keyFn(val);
      if (!acc[key]) acc[key] = [];
      acc[key].push(val);
      return acc;
    }, {});
  }
  

  export function formatDate(dateInput) {
    const d = new Date(dateInput);
    return isNaN(d) ? "" : d.toLocaleDateString();
  }
  
  export function generateUUID() {
    return "xxxxxxx".replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
  