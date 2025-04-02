const checkout = {
  items: [],
  total: 0,

  addItem(item) {
    if (!item || typeof item !== "object") {
      console.log("Invalid item format. Item should be an object.");
      return;
    }
    const { name, price } = item;

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.log(
        `Invalid price for item "${name}". Price should be a positive number`
      );
      return;
    }

    this.items.push({ name, price: parsedPrice });
    this.total += parsedPrice;

    console.log(`Item "${name}" added successfully.`);
  },
  getTotal(){
    return `Total: $${this.total.toFixed(2)}`;
  }
};
checkout.addItem({ name: "Coffee Maker", price: "99.95" });
checkout.addItem({ name: "Milk", price: 3.50 });
checkout.addItem({ name: "Invalid Item", price: "abc" });

console.log(checkout.getTotal())
