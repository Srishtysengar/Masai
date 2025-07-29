import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemeExplorer.css';

function MemeExplorer() {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const loadMemes = async () => {
    setLoading(true);
    setError('');
    setMemes([]);
    try {
      const res = await axios.get('https://api.imgflip.com/get_memes');
      if (!res.data.success) throw new Error('Failed to load memes');
      setMemes(res.data.data.memes);
      setFilteredMemes(res.data.data.memes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    let updated = [...memes];

    if (search.trim()) {
      updated = updated.filter((meme) =>
        meme.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === 'width') {
      updated = updated.filter((meme) => meme.width > 500);
    } else if (filter === 'height') {
      updated = updated.filter((meme) => meme.height > 500);
    }

    if (sort === 'name') {
      updated.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'width') {
      updated.sort((a, b) => b.width - a.width);
    }

    setFilteredMemes(updated);
  }, [search, sort, filter, memes]);


  const resetControls = () => {
    setSearch('');
    setSort('');
    setFilter('');
    setFilteredMemes(memes);
  };

  return (
    <div className={`meme-container ${theme}`}>
      <header>
        <h1>Meme Explorer</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <div className="controls">
        <button onClick={loadMemes} className="load-btn">Load Memes</button>
        {memes.length > 0 && (
          <button onClick={resetControls} className="reset-btn">Reset</button>
        )}

        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="width">Width</option>
        </select>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Filter By</option>
          <option value="width">Width  500</option>
          <option value="height">Height  500</option>
        </select>
      </div>

      {loading && <p className="loading">Loading memes...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && filteredMemes.length === 0 && memes.length > 0 && (
        <p className="no-memes">No memes found.</p>
      )}

      <div className="meme-grid">
        {filteredMemes.map((meme) => (
          <div className="meme-card" key={meme.id}>
            <img src={meme.url} alt={meme.name} />
            <h4>{meme.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemeExplorer;
