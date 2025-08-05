import {
  Flex,
  Text,
  Spacer,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeContext";

export default function Navbar() {
  const { loggedIn, toggleAuth } = useAuth();
  const { toggleTheme } = useThemeMode();
  const { toggleColorMode } = useColorMode();

  const handleThemeToggle = () => {
    toggleTheme();
    toggleColorMode();
  };

  return (
    <Flex bg="teal.500" color="white" p={4} align="center">
      <Text fontWeight="bold" fontSize="xl">Dashboard</Text>
      <Spacer />
      <Text mr={4}>{loggedIn ? "Logged In" : "Logged Out"}</Text>
      <Button onClick={toggleAuth} size="sm" mr={2}>Toggle Auth</Button>
      <Button onClick={handleThemeToggle} size="sm">Toggle Theme</Button>
    </Flex>
  );
}
