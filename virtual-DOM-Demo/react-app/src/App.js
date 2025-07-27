import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("React Virtual DOM Demo");
  const [reactUpdates, setReactUpdates] = useState(0);
  const [vanillaUpdates, setVanillaUpdates] = useState(0);

  const changeTitleVanilla = () => {
    const h1 = document.getElementById("vanilla-title");
    if (h1) {
      h1.textContent = "Title changed using Vanilla JS";
      setVanillaUpdates((prev) => prev + 1);
    }
  };

  const changeTitleReact = () => {
    setTitle("Title changed using React");
    setReactUpdates((prev) => prev + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1 id="vanilla-title">{title}</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={changeTitleVanilla}
          style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Change Title (Vanilla JS)
        </button>
        <button
          onClick={changeTitleReact}
          style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Change Title (React)
        </button>
      </div>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>Vanilla JS DOM Updates: {vanillaUpdates}</p>
        <p>React Virtual DOM Updates: {reactUpdates}</p>
      </div>
    </div>
  );
}

export default App;
