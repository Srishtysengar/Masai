

export let budgetLimit = 0;


export function setBudget(amount) {
  budgetLimit = amount;
  renderBudget();
}


export function calculateTotal(itemPrices = []) {
  return itemPrices.reduce((sum, p) => sum + p, 0);
}


export function renderBudget() {

  const inputs = document.querySelectorAll(".item-price");
  const prices = Array.from(inputs).map((i) => parseFloat(i.value) || 0);

 
  const total = calculateTotal(prices);

  const out = document.getElementById("budgetTotal");
  out.textContent = `Total: $${total.toFixed(2)}`;


  if (budgetLimit && total > budgetLimit) {
    out.classList.add("over-budget");
  } else {
    out.classList.remove("over-budget");
  }
}
