import React from "react";
import { TaskListProps } from "../types/taskTypes";

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <p>No tasks to display.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span style={{
            textDecoration: task.completed ? "line-through" : "none",
            marginLeft: "8px"
          }}>
            {task.description} ({task.priority})
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
