import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { FollowProvider } from './context/FollowContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FollowProvider>
        <App />
      </FollowProvider>
    </BrowserRouter>
  </React.StrictMode>
);