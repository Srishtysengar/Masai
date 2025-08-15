/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

function SearchBox({ onResults }) {
  const [query, setQuery] = useState("");

  const fetchResults = useCallback(
    debounce(async (q) => {
      if (!q) return onResults([]);
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${q}&format=json`);
        const results = res.data.map((item) => ({
          name: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        }));
        onResults(results);
      } catch (err) {
        console.error(err);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    fetchResults(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      placeholder="Search location..."
      onChange={handleChange}
      className="search-box"
    />
  );
}

export default React.memo(SearchBox);
