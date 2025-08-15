import React, { useState } from "react";

function RoutePlanner() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Route from "${start}" to "${end}" requested.`);
  };

  return (
    <form onSubmit={handleSubmit} className="route-planner">
      <input value={start} onChange={(e) => setStart(e.target.value)} placeholder="Start location" />
      <input value={end} onChange={(e) => setEnd(e.target.value)} placeholder="Destination" />
      <button type="submit">Plan Route</button>
    </form>
  );
}

export default React.memo(RoutePlanner);
