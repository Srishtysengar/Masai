import React, { useRef, useState } from "react";

export default function App() {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocusClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = "#ffffcc";
      setFocused(true);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Focus Input Example</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
        }}
      />

      <br /><br />

      <button
        onClick={handleFocusClick}
        style={{
          padding: "8px 12px",
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Focus Input
      </button>

      {focused && (
        <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
          Focused!
        </p>
      )}
    </div>
  );
}
