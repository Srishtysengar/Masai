import React, { useState } from "react";

const quotes = [
  "Believe in yourself and all that you are.",
  "Do something today that your future self will thank you for.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't watch the clock; do what it does. Keep going."
];

function DailyQuotesApp() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Daily Dose of Inspiration</h1>
      <p style={styles.quote}>"{quotes[index]}"</p>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handlePrev}>
          ⬅ Prev
        </button>
        <button style={styles.button} onClick={handleNext}>
          Next ➡
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
    height: "100vh"
  },
  heading: {
    color: "#333"
  },
  quote: {
    fontSize: "20px",
    fontStyle: "italic",
    margin: "20px 0",
    color: "#555"
  },
  buttonContainer: {
    marginTop: "20px"
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 10px"
  }
};

export default DailyQuotesApp;
