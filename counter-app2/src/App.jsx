import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/CounterSlice";

export default function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Redux Toolkit Counter</h1>
      <h2>{count}</h2>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => dispatch(increment())}>+</button>
        <button style={{ marginLeft: "10px" }} onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    </div>
  );
}
