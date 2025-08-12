import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../todoActions";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
    >
      <span
        style={{
          textDecoration: todo.status ? "line-through" : "none",
          cursor: "pointer"
        }}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.title}
      </span>
      <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ color: "red" }}>
        Delete
      </button>
    </div>
  );
}
