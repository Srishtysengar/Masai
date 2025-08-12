import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterAction";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Redux Counter App</h2>
      <h3>Count: {count}</h3>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <h4>State in JSON:</h4>
      <pre>{JSON.stringify({ count }, null, 2)}</pre>
    </div>
  );
}

export default App;
