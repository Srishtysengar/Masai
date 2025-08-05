import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { CustomThemeProvider, useThemeMode } from "./context/ThemeContext";
import Layout from "./components/Layout";

function AppWrapper() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CustomThemeProvider>
  );
}

function App() {
  const { theme } = useThemeMode();

  const customTheme = extendTheme({
    config: {
      initialColorMode: theme,
      useSystemColorMode: false,
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Layout />
    </ChakraProvider>
  );
}

export default AppWrapper;
