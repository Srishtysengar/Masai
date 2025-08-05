import React from 'react';
import { useAuth } from '../AuthContext';

const Main = () => {
  const { isLoggedIn } = useAuth();

  return (
    <main style={{ padding: '20px 0' }}>
      {isLoggedIn ? (
        <h2>You are logged in 🎉</h2>
      ) : (
        <h2>Please log in to continue.</h2>
      )}
    </main>
  );
};

export default Main;
