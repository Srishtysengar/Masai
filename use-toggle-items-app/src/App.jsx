import React from "react";
import useToggleItems from "./hooks/useToggleItems";

function App() {
  const [currentItem, toggleItem] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Custom Hook: useToggleItems</h1>
      <h2>Current Item: {currentItem}</h2>
      <button onClick={toggleItem}>Toggle Item</button>
    </div>
  );
}

export default App;
