import React from "react";

function UserCard({ name, email, age }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const nameStyle = { fontWeight: "bold", fontSize: "18px", marginBottom: "8px" };

  return (
    <div style={cardStyle}>
      <div style={nameStyle}>{name}</div>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default UserCard;
