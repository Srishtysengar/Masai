import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationList from "./components/NotificationList";
import Controls from "./components/Controls";

function App() {
  return (
    <ChakraProvider>
      <NotificationProvider>
        <Box maxW="600px" mx="auto" p={4}>
          <Heading mb={4}>🔔 Notification Panel</Heading>
          <Controls />
          <NotificationList />
        </Box>
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default App;
