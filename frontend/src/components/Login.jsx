import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const Login = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function HandleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!email) {
        toast({
          title: `Please Enter Email id`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      } else {
        let obj = { email };
        let res = await SendOTP(obj);
        toast({
          title: `${res.data.message}`,
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        position: "top",
        isClosable: true,
      });
      setIsLoading(false);
    }
  }
  function SendOTP(obj) {
    let userDeatil = axios
      .post(`https://eligere-tech-mzgn.onrender.com/otp`, obj)
      .then((res) => res);
    return userDeatil;
  }

  return (
    <div>
      <>
        <Stack align={"center"}>
          <Heading mb={4} fontSize={"4xl"}>
            Welcome to Eligene!
          </Heading>
        </Stack>
        <div>
          <Box
            w={"100%"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Stack>
                  {/* {error && <Text color={"red"}>{error}</Text>} */}
                </Stack>
                <Stack spacing={10}>
                  <Button
                    //   isLoading={isSigningIn}
                    loadingText={"Signing In..."}
                    w={{ lg: "350px" }}
                    bg={"#4358F6"}
                    color={"white"}
                    _hover={{
                      bg: "#3242b9",
                    }}
                    onClick={HandleLogin}
                  >
                    {isLoading ? <Spinner color="white" /> : "Login"}
                  </Button>
                </Stack>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?{" "}
                  <Link
                    color={"#4358F6"}
                    onClick={() => {
                      setRegister(false);
                    }}
                  >
                    Register here
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </div>
      </>
    </div>
  );
};

export default Login;
