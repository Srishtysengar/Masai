import React, { useMemo } from "react";

export default function FilterBar({
  author,
  genre,
  status,
  onSetAuthor,
  onSetGenre,
  onSetStatus,
  onClear
}) {
 
  return (
    <div className="filter-bar">
      <input
        placeholder="Filter by author"
        value={author}
        onChange={(e) => onSetAuthor(e.target.value)}
      />
      <input
        placeholder="Filter by genre"
        value={genre}
        onChange={(e) => onSetGenre(e.target.value)}
      />
      <select value={status} onChange={(e) => onSetStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}
