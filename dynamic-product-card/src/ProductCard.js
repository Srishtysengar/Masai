import React from "react";

function ProductCard({ name, price, image, discount }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  };

  const badgeStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div style={cardStyle}>
      {discount !== undefined && discount > 0 && (
        <div style={badgeStyle}>{discount}% OFF</div>
      )}
      <img src={image} alt={name} style={imageStyle} />
      <h3>{name}</h3>
      <p style={{ fontWeight: "bold" }}>Price: ₹{price}</p>
    </div>
  );
}

export default ProductCard;
