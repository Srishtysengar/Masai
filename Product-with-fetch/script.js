const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.getElementById('productGrid');
const productCount = document.getElementById('productCount');

let allProducts = [];
let filteredProducts = [];

// Fetching the products and categories on load
window.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  fetchCategories();
});

// Fetching all products
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      filteredProducts = data;
      renderProducts(data);
    });
}

// Fetching categories and populating dropdown
function fetchCategories() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
      });
    });
}

// Rendering products to the grid
function renderProducts(products) {
  productGrid.innerHTML = "";
  productCount.textContent = `Total Products: ${products.length}`;

  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}" />
      <h3>${prod.title}</h3>
      <p><strong>$${prod.price}</strong></p>
      <p>Category: ${prod.category}</p>
    `;

    productGrid.appendChild(card);
  });
}

// Filter and sort handler
function applyFilters() {
  let tempProducts = [...allProducts];

  const searchQuery = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const sortOrder = sortSelect.value;

  // Searching filter
  if (searchQuery) {
    tempProducts = tempProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery)
    );
  }

  // Category filter
  if (selectedCategory !== "all") {
    tempProducts = tempProducts.filter(product => product.category === selectedCategory);
  }

  // Sort filter
  if (sortOrder === "asc") {
    tempProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    tempProducts.sort((a, b) => b.price - a.price);
  }

  filteredProducts = tempProducts;
  renderProducts(filteredProducts);
}

// Event listeners
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
