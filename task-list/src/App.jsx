import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Redux Toolkit Task List</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}
