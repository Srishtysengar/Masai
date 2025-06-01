const searchBtn = document.getElementById("search-btn")
const categoryInput = document.getElementById("category");
const minPrice = document.getElementById("min-price")
const maxPrice = document.getElementById("max-price")
const productList = document.getElementById("productList");
const status = document.getElementById("status");
const loadingIndicator = document.getElementById("loading")

const BASE_URL = "https://mockapi.io/products";

searchBtn.addEventListener("click",()=>{
const category=categoryInput.value;
const min=minPrice.value;
const max=maxPrice.value

let url = `${BASE_URL}?`;

  if (category) url += `category=${category}&`;
  if (min) url += `min_price=${min}&`;
  if (max) url += `max_price=${max}&`;

  fetchProducts(url);
});
function fetchProducts(url) {
    productList.innerHTML = "";              // Clear previous results
    loadingIndicator.style.display = "block"; // Show loading spinner (if exists)
  
    fetch(url)                               // Make a GET request to the constructed URL
      .then((response) => {
        if (!response.ok) {                 // Handle HTTP errors
          throw new Error("Network response was not ok");
        }
        return response.json();             // Parse the response body as JSON
      })
      .then((data) => {
        loadingIndicator.style.display = "none"; // Hide loading spinner
        if (data.length === 0) {
          productList.innerHTML = "<p>No products found.</p>"; // Show message if no data
          return;
        }
        renderProducts(data);              // Call render function to show products
      })
      .catch((error) => {
        loadingIndicator.style.display = "none"; // Hide loading spinner
        productList.innerHTML = `<p>Error: ${error.message}</p>`; // Show error message
      });
  }
  
  // Render products on the page
  function renderProducts(products) {
    productList.innerHTML = "";            // Clear existing product list
  
    products.forEach((product) => {
      const div = document.createElement("div");   // Create a new div for each product
      div.className = "product";                   // Apply product CSS class
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
      `;
      productList.appendChild(div);                // Add the product div to the list
    });
  }