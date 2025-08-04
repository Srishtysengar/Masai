import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DataPage from './DataPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/data" element={<DataPage />} />
    </Routes>
  );
}

export default App;
