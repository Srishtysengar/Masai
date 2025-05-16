const products = [
    { id: 1, name: "Product A", price: 50, inStock: true },
    { id: 2, name: "Product B", price: 30, inStock: false },
    { id: 3, name: "Product C", price: 70, inStock: true },
    { id: 4, name: "Product D", price: 20, inStock: false }
  ];
  
  // Selecting the container
  const grid = document.getElementById('productGrid');
  
  // Iterating and creating each product card
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product');
  
    // Applying conditional background color
    if (product.inStock) {
      card.classList.add('in-stock');
    } else {
      card.classList.add('out-of-stock');
    }
  
    // Seting inner content
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Status: ${product.inStock ? "In Stock" : "Out of Stock"}</p>
    `;
  
    grid.appendChild(card);
  });
  