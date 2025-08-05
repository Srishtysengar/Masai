import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // ✅ Import from here
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider> {/* ✅ Wrap App here */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
