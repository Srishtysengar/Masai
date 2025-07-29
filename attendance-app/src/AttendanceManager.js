import React, { useState } from 'react';
import './AttendanceManager.css';

function AttendanceManager() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', present: true },
    { id: 2, name: 'Bob', present: false },
    { id: 3, name: 'Charlie', present: true },
    { id: 4, name: 'Diana', present: false },
    { id: 5, name: 'Ethan', present: true },
  ]);

  const [filter, setFilter] = useState('All'); 

  const toggleAttendance = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const presentCount = students.filter((student) => student.present).length;

  const filteredStudents = students.filter((student) => {
    if (filter === 'Present') return student.present;
    if (filter === 'Absent') return !student.present;
    return true; // All
  });

  return (
    <div className="attendance-container">
      <h2>Attendance Manager</h2>
      
      <div className="filter-section">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <ul className="student-list">
        {filteredStudents.map((student) => (
          <li
            key={student.id}
            className={student.present ? 'present' : 'absent'}
          >
            <span>{student.name} - {student.present ? 'Present' : 'Absent'}</span>
            <button onClick={() => toggleAttendance(student.id)}>Toggle</button>
          </li>
        ))}
      </ul>

      <p className="present-count">Total Present: {presentCount}</p>
    </div>
  );
}

export default AttendanceManager;
