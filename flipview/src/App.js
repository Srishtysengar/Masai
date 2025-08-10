import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
}

const initialState = { isVisible: false };

export default function ToggleMessageApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={styles.container}>
      <h1>Toggle Message App</h1>
      <button
        style={styles.button}
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
      >
        Toggle Message
      </button>
      {state.isVisible && <p style={styles.message}>Hello, World!</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  message: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};
