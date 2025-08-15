import React from "react";
import useTimer from "../hooks/useTimer";

export default function TimerComponent() {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Custom Hook: useTimer</h2>
      <h1>{timer} seconds</h1>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
