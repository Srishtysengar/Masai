import React, { useState, useEffect } from "react";
import axios from "axios";

function MemeExplorer() {
  const [memes, setMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes")
      .then(res => {
        if (res.data.success) {
          setMemes(res.data.data.memes);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
  };

  if (memes.length === 0) {
    return <p>Loading memes...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Meme Navigator</h1>
      <div>
        <img 
          src={memes[currentIndex].url} 
          alt={memes[currentIndex].name} 
          style={{ maxWidth: "400px", borderRadius: "8px" }}
        />
        <h3>{memes[currentIndex].name}</h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev}>⬅ Prev</button>
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>Next ➡</button>
      </div>
    </div>
  );
}

export default MemeExplorer;
