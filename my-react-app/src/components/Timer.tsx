import React, { useState, useEffect } from "react";
import { TimerState } from "../types/timerTypes";

const Timer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    seconds: 0,
    isRunning: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => ({ ...prev, seconds: prev.seconds + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const startTimer = () => setTimer((prev) => ({ ...prev, isRunning: true }));
  const stopTimer = () => setTimer((prev) => ({ ...prev, isRunning: false }));
  const resetTimer = () => setTimer({ seconds: 0, isRunning: false });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{timer.seconds} sec</h1>
      <button onClick={startTimer} disabled={timer.isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!timer.isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
