import { Button, Stack } from "@chakra-ui/react";
import { useNotifications } from "../context/NotificationContext";

const Controls = () => {
  const { markAllAsRead, stopNotifications } = useNotifications();

  return (
    <Stack direction="row" spacing={4} mt={4}>
      <Button colorScheme="blue" onClick={markAllAsRead}>
        Mark All as Read
      </Button>
      <Button colorScheme="red" onClick={stopNotifications}>
        Stop Notifications
      </Button>
    </Stack>
  );
};

export default Controls;
