import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timer, setTimer] = useState(10);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  const startTimer = () => {
    setShowConfirmation(true);
    setTimer(10);
    const id = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setShowConfirmation(false);
  };

  const handleYes = () => {
    stopTimer();
    navigate('/data');
  };

  const handleNo = () => {
    stopTimer();
  };

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
    }
  }, [timer]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!showConfirmation && (
        <button onClick={startTimer}>Fetch Data</button>
      )}

      {showConfirmation && (
        <div>
          <p>Are you sure you want to fetch the data?</p>
          <h2 style={{ color: timer > 5 ? 'green' : 'red' }}>{timer}</h2>
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo} style={{ marginLeft: '10px' }}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
