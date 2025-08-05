import React from 'react';
import { useTheme } from './ThemeContext';

const NestedComponent = () => {
  const { theme } = useTheme();

  const boxStyles = {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#f2f2f2' : '#333333',
    color: theme === 'light' ? '#000000' : '#ffffff',
    borderRadius: '8px',
  };

  return (
    <div style={boxStyles}>
      <p>This is a nested component using the {theme} theme.</p>
    </div>
  );
};

export default NestedComponent;
