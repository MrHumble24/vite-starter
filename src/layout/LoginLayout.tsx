import { Box, Button, Card, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const LoginLayout = () => {
  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
      flexDir={"column"}
      className='bg'
      p={10}
    >
      <Card
        maxW={{ base: "98%", md: "30%" }}
        padding={10}
        display={"flex"}
        gap={10}
        justifyContent={"center"}
      >
        <Center>
          <Logo />
        </Center>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={5}
          justifyContent={"center"}
        >
          <Link style={{ width: "100%" }} to='/login/admins'>
            <Button
              width={"100%"}
              px={10}
              py={5}
              rounded={"full"}
              colorScheme='blue'
            >
              Admin Login
            </Button>
          </Link>

          <Link style={{ width: "100%" }} to='/login/students'>
            <Button
              width={"100%"}
              px={10}
              py={5}
              rounded={"full"}
              colorScheme='green'
            >
              Student Login
            </Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginLayout;
