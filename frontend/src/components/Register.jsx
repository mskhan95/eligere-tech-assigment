import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Link,
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Login from "./Login";

const Register = () => {
  const avatars = [
    {
      name: "Shaban Khan",
      url: "https://avatars.githubusercontent.com/u/116796791?v=4",
    },
    {
      name: "Rajesh Pachika",
      url: "https://avatars.githubusercontent.com/u/105877055?v=4",
    },
    {
      name: "Anmol Jagota",
      url: "https://avatars.githubusercontent.com/u/101393363?v=4",
    },
    {
      name: "Vishal",
      url: "https://avatars.githubusercontent.com/u/112762252?v=4",
    },
    {
      name: "Sunil Chaudhary",
      url: "https://avatars.githubusercontent.com/u/105533945?v=4",
    },
  ];
  const [fname, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventSession, setEventSession] = useState("");
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  //   function Resetform() {
  //     setEmail("");
  //     setFName("");
  //     setEventSession("");
  //     setPhone("");
  //   }

  async function handleRegister(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (fname === "" || email === "" || phone === "" || eventSession === "") {
        toast({
          title: `Please Fill All Field`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      } else if (fname && email && phone && eventSession) {
        let obj = {
          fname,
          email,
          phone,
          eventSession,
        };
        let result = await RegisterUser(obj);
        console.log(result);
        if (result.status === 201) {
          toast({
            title: `You have successfully registered`,
            status: "success",
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: `Some thing went wrong`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
        // Resetform();
      }
    } catch (error) {
      toast({
        title: `${error.response.data.error}`,
        status: "info",
        position: "top",
        isClosable: true,
      });
    }

    setIsLoading(false);
  }

  function RegisterUser(obj) {
    let userDeatil = axios
      .post(`https://eligere-tech-mzgn.onrender.com/create`, obj)
      .then((res) => res);
    return userDeatil;
  }

  const handleChange = (value) => {
    setEventSession(value);
  };

  return (
    <div>
      <Box
        bgColor={"#f6f5ff"}
        h={"100vh"}
        boxSizing="border-box"
        position={"relative"}
      >
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, md: 1, lg: 16 }}
          py={{ sm: 1, md: 14, lg: 16 }}
        >
          <Stack
            spacing={{ base: 10, md: 10 }}
            mt={{ base: "30px", sm: "30px", md: "40px", lg: "85px" }}
          >
            <Heading
              lineHeight={{ sm: "1.5", lg: "1.1" }}
              textAlign={["center", "center", "left"]}
            >
              <Text
                as="span"
                fontWeight={"600"}
                fontSize={{ sm: "30px", md: "40px", lg: "50px" }}
              >
                Join now{" "}
              </Text>
              <Text
                as={"span"}
                bgGradient="linear(to-r, #4358F6,#4358F6)"
                bgClip="text"
              >
                &
              </Text>{" "}
              <Text
                as="span"
                fontWeight={"600"}
                fontSize={{ sm: "30px", md: "40px", lg: "50px" }}
              >
                and take the first step towards a smarter future with Eligene.
              </Text>
            </Heading>
            <Stack
              direction={"row"}
              spacing={4}
              justify={"center"}
              align={"center"}
            >
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    size={useBreakpointValue({ base: "md", md: "lg" })}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, white,#4358F6)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
                minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, purple.500,purple.500)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            spacing={8}
            maxW={"6xl"}
            px={6}
            overflow={"hidden"}
            align={"center"}
          >
            {register ? (
              <Login setRegister={setRegister} />
            ) : (
              <>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>Welcome to Eligene!</Heading>
                </Stack>
                <div>
                  <Box
                    w={"100%"}
                    rounded={"lg"}
                    bg={"white"}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Stack>
                      <Stack spacing={4}>
                        <FormControl id="fname">
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            type="text"
                            placeholder="Enter Your Full Name"
                            onChange={(e) => setFName(e.target.value)}
                          />
                        </FormControl>
                        <FormControl id="email">
                          <FormLabel>Email address</FormLabel>
                          <Input
                            type="email"
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormControl>
                        <FormControl id="phone">
                          <FormLabel>Phone Number</FormLabel>
                          <Input
                            type="number"
                            placeholder="Ex:0000000000"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormControl>
                        <FormControl id="eventSession">
                          <FormLabel>Event Session</FormLabel>
                          <RadioGroup
                            value={eventSession}
                            onChange={handleChange}
                          >
                            <HStack spacing="24px">
                              <Radio value="Morning">Morning</Radio>
                              <Radio value="Afternoon">Afternoon</Radio>
                              <Radio value="Evening">Evening</Radio>
                            </HStack>
                          </RadioGroup>
                        </FormControl>
                        <Stack>
                          {/* {error && <Text color={"red"}>{error}</Text>} */}
                        </Stack>
                        <Stack spacing={10}>
                          <Button
                            loadingText={"Signing In..."}
                            w={{ lg: "350px" }}
                            bg={"#4358F6"}
                            color={"white"}
                            _hover={{
                              bg: "#3242b9",
                            }}
                            onClick={handleRegister}
                          >
                            {isLoading ? <Spinner color="white" /> : "Register"}
                          </Button>
                        </Stack>
                      </Stack>
                      <Stack pt={6}>
                        <Text align={"center"}>
                          Already have an account?{" "}
                          <Link
                            color={"#4358F6"}
                            onClick={() => {
                              setRegister(true);
                            }}
                          >
                            Log in here
                          </Link>
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </div>
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Register;
