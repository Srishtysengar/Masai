import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

const themeConfig = extendTheme({});

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgNav = theme === 'light' ? 'gray.100' : 'gray.700';
  const bgCard = theme === 'light' ? 'gray.200' : 'gray.600';
  const bgFooter = theme === 'light' ? 'gray.300' : 'gray.800';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <ChakraProvider theme={themeConfig}>
      <nav
        style={{
          padding: '16px',
          backgroundColor: bgNav,
          display: 'flex',
          justifyContent: 'space-between',
          color: textColor,
        }}
      >
        <button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
        <button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </nav>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          padding: '16px',
        }}
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <div
            key={card}
            style={{
              backgroundColor: bgCard,
              padding: '16px',
              borderRadius: '8px',
              color: textColor,
            }}
          >
            {card}
          </div>
        ))}
      </div>

      <footer
        style={{
          padding: '16px',
          backgroundColor: bgFooter,
          textAlign: 'center',
          color: textColor,
        }}
      >
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </footer>
    </ChakraProvider>
  );
}

export default App;
