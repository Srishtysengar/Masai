import React, { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <h2 style={{ color: "green" }}>Welcome to Home Page</h2>;
      case "About":
        return <h2 style={{ color: "blue" }}>About Us</h2>;
      case "Contact":
        return <h2 style={{ color: "red" }}>Contact Us</h2>;
      default:
        return <h2>Welcome to Home Page</h2>;
    }
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "15px",
          backgroundColor: "#f2f2f2",
          borderBottom: "2px solid #ccc",
        }}
      >
        <button
          onClick={() => setActivePage("Home")}
          style={{
            backgroundColor: activePage === "Home" ? "#ddd" : "transparent",
            border: "1px solid #ccc",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Home
        </button>
        <button
          onClick={() => setActivePage("About")}
          style={{
            backgroundColor: activePage === "About" ? "#ddd" : "transparent",
            border: "1px solid #ccc",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          About
        </button>
        <button
          onClick={() => setActivePage("Contact")}
          style={{
            backgroundColor: activePage === "Contact" ? "#ddd" : "transparent",
            border: "1px solid #ccc",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Contact
        </button>
      </nav>

      <div style={{ textAlign: "center", marginTop: "40px" }}>{renderPage()}</div>
    </div>
  );
}

export default App;
