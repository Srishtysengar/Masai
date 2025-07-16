const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const toast = document.getElementById('toast');
const totalsDiv = document.getElementById('totals');
const filters = document.querySelectorAll('.filter button');

let allItems = [];

function renderList(items) {
  itemList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.qty} - ₹${item.price * item.qty} 
      <span class="delete" data-id="${item.id}">🗑️</span>`;
    itemList.appendChild(li);
  });

 
  const totalQty = items.reduce((sum, i) => sum + parseInt(i.qty), 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  totalsDiv.innerHTML =`Items: ${totalQty} | Total: ₹${totalPrice.toFixed(2)}`;
}

function addItemToFirebase(item) {
  const id = Date.now().toString();
  item.id = id;
  db.ref('items/' + id).set(item).catch(() => {
    const pending = JSON.parse(localStorage.getItem('pending')) || [];
    pending.push(item);
    localStorage.setItem('pending', JSON.stringify(pending));
  });
}

function removeItem(id) {
  const deleted = allItems.find(i => i.id === id);
  localStorage.setItem('lastDeleted', JSON.stringify(deleted));
  db.ref('items/' + id).remove();
  showUndoToast();
}

function showUndoToast() {
  toast.textContent = 'Item deleted. Undo?';
  toast.style.display = 'block';
  const undoTimeout = setTimeout(() => {
    toast.style.display = 'none';
    localStorage.removeItem('lastDeleted');
  }, 5000);

  toast.onclick = () => {;
    const item = JSON.parse(localStorage.getItem('lastDeleted'));
    addItemToFirebase(item);
    localStorage.removeItem('lastDeleted');
    toast.style.display = 'none';
    clearTimeout(undoTimeout);
  };
}


form.onsubmit = (e) => {
  e.preventDefault();
  const name = form.itemName.value.trim();
  const qty = parseInt(form.itemQty.value);
  const price = parseFloat(form.itemPrice.value);
  const category = form.itemCategory.value;

  if (!name || qty < 1 || price <= 0 || !category) return;

  const item = { name, qty, price, category };
  addItemToFirebase(item);
  form.reset();
  form.itemName.focus();
};


db.ref('items').on('value', snapshot => {
  const data = snapshot.val() || {};
  allItems = Object.values(data);
  renderList(allItems);
});


itemList.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    removeItem(id);
  }
});


filters.forEach(btn => {
  btn.onclick = () => {
    const cat = btn.dataset.filter;
    if (cat === 'All') renderList(allItems);
    else renderList(allItems.filter(i => i.category === cat));
  };
});


window.addEventListener('online', () => {
  const pending = JSON.parse(localStorage.getItem('pending')) || [];
  pending.forEach(item => addItemToFirebase(item));
  localStorage.removeItem('pending');
});