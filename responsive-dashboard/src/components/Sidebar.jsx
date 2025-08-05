import {
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { loggedIn } = useAuth();
  const bg = useColorModeValue("gray.200", "gray.700");

  if (isMobile) return null;

  return (
    <Box w="250px" p={4} bg={bg}>
      <Text fontSize="lg" fontWeight="bold">Sidebar</Text>
      {loggedIn && <Text mt={2}>Welcome back, user!</Text>}
    </Box>
  );
}
