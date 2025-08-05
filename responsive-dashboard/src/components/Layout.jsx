import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const products = [
  "Product A", "Product B", "Product C", "Product D",
  "Product E", "Product F", "Product G", "Product H",
];

export default function Layout() {
  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700"); // ✅ move hook to top level

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1" p={6} bg={bg}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {products.map((product, index) => (
              <Box
                key={index}
                p={5}
                bg={cardBg} // ✅ use precomputed value
                shadow="md"
                borderRadius="md"
              >
                <Text fontSize="xl" fontWeight="bold">{product}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}
