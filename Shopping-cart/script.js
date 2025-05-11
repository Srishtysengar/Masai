let currentUser = null;

function login() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const userMsg = document.getElementById("userMsg");

  if (!username) {
    userMsg.textContent = "Username cannot be empty.";
    return;
  }

  currentUser = username;
  userMsg.textContent = "";
  document.getElementById("cart-section").classList.remove("hidden");
  document.getElementById("welcomeUser").textContent = `Welcome, ${currentUser}`;
  loadCart();
}

function getCartData() {
  return JSON.parse(localStorage.getItem("carts")) || {};
}

function saveCartData(data) {
  localStorage.setItem("carts", JSON.stringify(data));
}

function loadCart() {
  const data = getCartData();
  const userCart = data[currentUser] || [];
  displayCart(userCart);
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const qty = parseInt(document.getElementById("itemQty").value);

  if (!name || isNaN(price) || isNaN(qty) || qty < 1) {
    alert("Please provide valid item details.");
    return;
  }

  const data = getCartData();
  if (!data[currentUser]) data[currentUser] = [];

  const existingIndex = data[currentUser].findIndex(item => item.itemName === name);

  if (existingIndex > -1) {
    data[currentUser][existingIndex].quantity += qty;
  } else {
    data[currentUser].push({ itemName: name, price, quantity: qty });
  }

  saveCartData(data);
  displayCart(data[currentUser]);

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemQty").value = "";
}

function displayCart(cart) {
  const container = document.getElementById("cartContainer");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    const totalCost = item.price * item.quantity;
    total += totalCost;

    itemDiv.innerHTML = `
      <span><strong>${item.itemName}</strong></span>
      <span>Price: $${item.price}</span>
      <input type="number" value="${item.quantity}" min="1" onchange="updateQty(${index}, this.value)" />
      <span>Total: $${totalCost}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    container.appendChild(itemDiv);
  });

  document.getElementById("totalCost").textContent = `Total: $${total.toFixed(2)}`;
}

function updateQty(index, newQty) {
  newQty = parseInt(newQty);
  if (isNaN(newQty) || newQty < 1) {
    alert("Quantity must be at least 1.");
    return;
  }

  const data = getCartData();
  data[currentUser][index].quantity = newQty;
  saveCartData(data);
  displayCart(data[currentUser]);
}

function removeItem(index) {
  const data = getCartData();
  data[currentUser].splice(index, 1);
  saveCartData(data);
  displayCart(data[currentUser]);
}
