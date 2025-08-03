import React, { useState, useEffect } from 'react';
import ThemedBox from './ThemedBox';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Theme Toggle App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div className="box-container">
        <ThemedBox theme={theme} text="hello" />
        <ThemedBox theme={theme} text="hello hi" />
        <ThemedBox theme={theme} text="bye" />
      </div>
    </div>
  );
}

export default App;
