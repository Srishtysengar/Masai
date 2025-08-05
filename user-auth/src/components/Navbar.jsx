import React from 'react';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, toggleLogin } = useAuth();

  return (
    <nav style={{ padding: '10px 0', borderBottom: '1px solid gray' }}>
      <button onClick={toggleLogin}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;
