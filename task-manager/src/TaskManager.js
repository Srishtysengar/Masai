import React, { useState } from 'react';
import './TaskManager.css'; 

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };

  const addTask = () => {
    if (title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(sortTasks(updatedTasks));
    setTitle('');
    setPriority('Medium');
  };

  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks(updatedTasks));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Completed' && task.completed) ||
      (filterStatus === 'Incomplete' && !task.completed);
    return matchesPriority && matchesStatus;
  });

  return (
    <div className="task-manager">
      <h2>Advanced Task Manager</h2>

      <div className="task-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-filters">
        <label>Priority: </label>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Status: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

     
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleComplete(task.id)}>
              {task.title} ({task.priority})
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
