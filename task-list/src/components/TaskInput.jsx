import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";

export default function TaskInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTask(text));
      setText("");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        placeholder="Enter a new task"
        onChange={(e) => setText(e.target.value)}
      />
      <button style={{ marginLeft: "10px" }} onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
}
