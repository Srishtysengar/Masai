import React from 'react';

function ThemedBox({ theme, text }) {
  const boxStyle = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    boxShadow: theme === 'light'
      ? '0 2px 4px rgba(0,0,0,0.1)'
      : '0 2px 4px rgba(255,255,255,0.2)'
  };

  return <div style={boxStyle}>{text}</div>;
}

export default ThemedBox;
