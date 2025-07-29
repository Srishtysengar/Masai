import React, { useState } from 'react';

function FetchProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('Fetched Products:', data); // Logs to console
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2>Fetch Products Example</h2>
      <button
        onClick={fetchProducts}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4cafef',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Fetch Products
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default FetchProducts;
