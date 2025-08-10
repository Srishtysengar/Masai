import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const currentPageRef = useRef(1);


useEffect(() => {
  const fetchCharacters = async () => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPageRef.current}`
      );
      const data = await res.json();
      setCharacters(data.results.slice(0, 10));
      setTotalPages(data.info.pages);
    } catch (err) {
      console.error("Error fetching characters:", err);
    }
  };
  fetchCharacters();
}, []);


  const handlePageClick = (page) => {
    currentPageRef.current = page;
    setCharacters([]); 
    fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPageRef.current}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results.slice(0, 10));
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Rick and Morty Characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {characters.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <img
              src={char.image}
              alt={char.name}
              style={{
                width: "100%",
                borderRadius: "6px",
                marginBottom: "8px",
              }}
            />
            <h4 style={{ margin: "0" }}>{char.name}</h4>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "5px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background:
                currentPageRef.current === page ? "#4CAF50" : "#fff",
              color: currentPageRef.current === page ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
