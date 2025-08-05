import React from 'react';
import { useAuth } from '../AuthContext';

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer style={{ paddingTop: '20px', borderTop: '1px solid gray' }}>
      <p>{isLoggedIn ? 'Welcome, User 👋' : 'Please log in 🔒'}</p>
    </footer>
  );
};

export default Footer;
