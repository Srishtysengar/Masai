import React, { useState } from "react";
import { TaskFormProps, Priority } from "../types/taskTypes";

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onAddTask(description, priority);
    setDescription("");
    setPriority(Priority.Low);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        {Object.values(Priority).map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
