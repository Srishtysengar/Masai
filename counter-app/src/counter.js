import React, { useState } from 'react';
import './counter.css'; 

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0); 
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <h2>React Counter</h2>
      <p className="count-display">Count: {count}</p>
      
      {count === 10 && <p className="goal-message">Goal Reached!</p>}

      <div className="button-group">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
