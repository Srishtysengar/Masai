import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <div style={{ fontFamily: 'Arial', padding: '20px' }}>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
