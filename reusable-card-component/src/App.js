import React from "react";
import Card from "./card";

function App() {
  const appStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
  };

  return (
    <div style={appStyle}>
      <Card title="Card 1">
        <p>This is the content of the first card.</p>
      </Card>

      <Card title="Card 2">
        <p>This is another card, and it has different content!</p>
        <button>Click Me</button>
      </Card>

      <Card title="Card 3">
        <ul>
          <li>Dynamic Item 1</li>
          <li>Dynamic Item 2</li>
          <li>Dynamic Item 3</li>
        </ul>
      </Card>
    </div>
  );
}

export default App;
