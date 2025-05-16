// Selecting the product grid container
const grid = document.getElementById("productGrid");

// Fetching products from FakestoreAPI
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Conditional border color
      if (product.price > 50) {
        card.classList.add("expensive");
      } else {
        card.classList.add("affordable");
      }

      // Filling the product data
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;

      // Adding to grid
      grid.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    grid.innerHTML = `<p>Failed to load products.</p>`;
  });
