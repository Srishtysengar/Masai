import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import NestedComponent from './NestedComponent';

const ThemedApp = () => {
  const { theme, toggleTheme } = useTheme();

  const appStyles = {
    minHeight: '100vh',
    backgroundColor: theme === 'light' ? '#ffffff' : '#222222',
    color: theme === 'light' ? '#000000' : '#ffffff',
    padding: '20px',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={appStyles}>
      <h1>React Theme Context Demo</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <NestedComponent />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedApp />
  </ThemeProvider>
);

export default App;
