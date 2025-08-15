import React from "react";

function SearchResultsList({ results }) {
  return (
    <ul className="search-results">
      {results.map((res, idx) => (
        <li key={idx}>{res.name}</li>
      ))}
    </ul>
  );
}

export default React.memo(SearchResultsList);
