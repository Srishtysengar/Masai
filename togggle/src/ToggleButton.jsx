import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ label = "Power" }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(prev => !prev);
  };

  return (
    <div className="toggle-container">
      <span className="label">{label}:</span>
      <button
        onClick={toggle}
        className={`toggle-btn ${isOn ? 'on' : 'off'}`}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default ToggleButton;
