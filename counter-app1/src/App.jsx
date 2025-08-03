import React from 'react';
import './App.css';
import Counter from './Counter';

function App() {
  return (
    <div className="app-container">
      <h1>Counter App</h1>
      <Counter initialValue={5} />
    </div>
  );
}

export default App;
