import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState(["Buy milk", "Study React"]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return; // Prevent empty tasks
    setTasks([...tasks, input.trim()]);
    setInput('');
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="todo-container">
      <h2>Simple Todo List</h2>

      <div className="todo-input">
        <input
          type="text"
          value={input}
          placeholder="Enter a new task"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearAll} className="clear-btn">Clear All</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks available.</p>
      ) : (
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
