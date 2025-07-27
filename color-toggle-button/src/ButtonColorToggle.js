import React, { useState } from "react";

function ButtonColorToggle() {
  const [color, setColor] = useState("Green");

  const toggleColor = () => {
    setColor((prev) => (prev === "Green" ? "Yellow" : "Green"));
  };

  const buttonStyle = {
    backgroundColor: color.toLowerCase(),
    color: color === "Yellow" ? "black" : "white", 
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button style={buttonStyle} onClick={toggleColor}>
        Color: {color}
      </button>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Current Color: {color}
      </p>
    </div>
  );
}

export default ButtonColorToggle;
