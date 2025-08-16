import React from "react";
import Timer from "./components/Timer";

const App: React.FC = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>TypeScript React Timer</h2>
      <Timer />
    </div>
  );
};

export default App;
