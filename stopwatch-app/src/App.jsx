import { useEffect, useState, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(10);
  const audioRef = useRef(null);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (time === parseInt(targetTime, 10)) {
      console.log("🎯 Target time reached!");
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [time, targetTime]);

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Stopwatch</h1>
      <h2>{time} seconds</h2>

      <div style={{ marginBottom: "1rem" }}>
        🎯 Target time:
        <input
          type="number"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          style={{ marginLeft: "10px", width: "60px" }}
        />
        seconds
      </div>

      <button onClick={() => setRunning(true)} disabled={running}>
        Start
      </button>
      <button onClick={() => setRunning(false)} disabled={!running}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>

      <audio ref={audioRef} src="https://freesound.org/s/246328/" />
    </div>
  );
}
