import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTask, removeTask } from "../features/tasksSlice";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => dispatch(toggleTask(task.id))}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch(removeTask(task.id))}>❌</button>
          </div>
        ))
      )}
    </div>
  );
}
