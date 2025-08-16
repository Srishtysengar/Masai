import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task, Priority } from "./types/taskTypes";
import "./App.css";

type Filter = "all" | "completed" | "incomplete";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = (description: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />

      <div style={{ marginBottom: "20px" }}>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TaskList tasks={filteredTasks} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default App;
