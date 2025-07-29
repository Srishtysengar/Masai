import React, { useState } from 'react';
import './ProductGrid.css';

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    setProducts([]);

    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearProducts = () => {
    setProducts([]);
    setError('');
  };

  return (
    <div className="container">
      <h2>FakeStore Product Grid</h2>

      <div className="button-group">
        <button onClick={loadProducts} className="load-btn">Load Products</button>
        {products.length > 0 && (
          <button onClick={clearProducts} className="clear-btn">Clear Products</button>
        )}
      </div>

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="no-data">No products available. Click "Load Products".</p>
      )}

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
