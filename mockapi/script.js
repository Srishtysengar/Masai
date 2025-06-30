async function fetchProducts() {
  const category = document.getElementById("category").value;
  const min = document.getElementById("minPrice").value;
  const max = document.getElementById("maxPrice").value;
  const status = document.getElementById("status");
  const productList = document.getElementById("products");

  productList.innerHTML = "";
  status.textContent = "Loading...";

  let url = `https://68618ba48e74864084465a62.mockapi.io/user`;

  const params = [];
  if (category) params.push(`category=${encodeURIComponent(category)}`);
  if (min) params.push(`price_gte=${min}`);
  if (max) params.push(`price_lte=${max}`);
  params.push(`sortBy=price&order=asc`);

  if (params.length) url += "?" + params.join("&");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      status.textContent = "No products found.";
      return;
    }

    status.textContent = "";
    data.forEach(product => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      `;
      productList.appendChild(card);
    });

  } catch (error) {
    status.textContent = "⚠️ Error fetching products.";
    status.className = "error";
    console.error(error);
  }
}

