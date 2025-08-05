import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const bg = useColorModeValue("gray.300", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bg} color={color} textAlign="center" py={3} mt="auto">
      <Text>Created by Srishty</Text>
    </Box>
  );
}
