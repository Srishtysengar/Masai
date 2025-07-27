import React from "react";

function Card({ title, children }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    margin: "15px",
    width: "250px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default Card;
