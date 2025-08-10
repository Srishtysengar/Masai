import React, { useReducer } from "react";

// Initial State
const initialState = {
  theme: "light",
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Theme styles
  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    dark: {
      backgroundColor: "#333333",
      color: "#ffffff",
    },
  };

  return (
    <div
      style={{
        ...themeStyles[state.theme],
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h1>Theme Toggle App</h1>
      <p>Current Theme: {state.theme}</p>
      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        style={{
          padding: "10px 20px",
          background: state.theme === "light" ? "#000" : "#fff",
          color: state.theme === "light" ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
