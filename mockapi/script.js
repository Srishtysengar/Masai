async function fetchProducts() {
  const category = document.getElementById("category").value;
  const min = document.getElementById("minPrice").value;
  const max = document.getElementById("maxPrice").value;
  const status = document.getElementById("status");
  const productList = document.getElementById("products");

  productList.innerHTML = "";
  status.textContent = "Loading...";
  status.className = "status";

  let url = `GET https://mockapi.io/products?category=electronics&min_price=1000&max_price=5000&sort=asc

`; 

  const params = [];
  if (category) params.push(`category=${category}`);
  if (min) params.push(`min_price=${min}`);
  if (max) params.push(`max_price=${max}`);
  params.push(`sort=asc`);

  url += params.join("&");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    if (data.length === 0) {
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
    status.className = "status error";
    console.error(error);
  }
}
