document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const errorDiv = document.getElementById('error');
  
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); 
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const products = await response.json(); 
  
        products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
  
          const img = document.createElement('img');
          img.src = product.image;
          img.alt = product.title;
  
          const title = document.createElement('div');
          title.className = 'product-title';
          title.textContent = product.title;
  
          const price = document.createElement('div');
          price.className = 'product-price';
          price.textContent = `$${product.price}`;
  
          const button = document.createElement('button');
          button.textContent = 'View Details';
          button.addEventListener('click', () => {
            alert(`Product: ${product.title}\nPrice: $${product.price}`);
          });
  
          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(price);
          card.appendChild(button);
  
          productContainer.appendChild(card);
        });
  
      } catch (error) {
        errorDiv.textContent = "Failed to fetch products. Please try again later.";
        console.error('Fetch error:', error); 
      }
    }
  
 
    fetchProducts();
  });
  