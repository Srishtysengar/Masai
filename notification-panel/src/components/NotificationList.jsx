import { Box, Text } from "@chakra-ui/react";
import { useNotifications } from "../context/NotificationContext";

const NotificationList = () => {
  const { notifications } = useNotifications();

  return (
    <Box mt={4}>
      {notifications.length === 0 && <Text>No notifications</Text>}
      {notifications.map((notif) => (
        <Box
          key={notif.id}
          p={3}
          mb={2}
          borderWidth="1px"
          borderRadius="md"
          bg={notif.read ? "gray.100" : "orange.100"}
        >
          <Text fontWeight={notif.read ? "normal" : "bold"}>
            {notif.message}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default NotificationList;
