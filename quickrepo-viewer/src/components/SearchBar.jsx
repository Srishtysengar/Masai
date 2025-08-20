import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-row" onSubmit={submit} aria-label="Search GitHub user">
      <input
        className="input"
        type="text"
        placeholder="Enter GitHub username (e.g., vercel)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="GitHub username"
      />
      <button className="button" type="submit">Search</button>
    </form>
  );
}