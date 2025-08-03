import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
       console.log("Fetched quote:", data); // 👈 add this
      setQuote(data);
    } catch (err) {
      console.error('Failed to fetch quote', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // initial load
    const interval = setInterval(fetchQuote, 30000); // auto refresh every 30s
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="app">
      <h1>Daily Quote Generator</h1>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        quote && (
          <div className="quote-box fade-in">
            <p className="quote">"{quote.content}"</p>
            <p className="author">— {quote.author}</p>
          </div>
        )
      )}

      <button onClick={fetchQuote} disabled={loading}>
        {loading ? 'Loading...' : 'Get New Quote'}
      </button>
    </div>
  );
}

export default App;
