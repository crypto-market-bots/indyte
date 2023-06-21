
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function forgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const history = useHistory();

  const [show, setShow] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });
  const handleCheck = (e) => {
    console.log(e.target.checked);
    setChecked(e.target.checked);
  };

  const notify = (status, msg) => {
    if (status) {
      toast.success(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };
  const handleClick = () => setShow(!show);
  // const handleSubmit = () => {
  //   let formData = new FormData();
  //   formData.append("email", value.email);
  //   formData.append("password", value.password);

  //   // axios.post('https://cineview.onrender.com/api/user/loginuser',formData)
  //   axios
  //     .post("https://cineview.onrender.com/api/user/loginuser", formData)
  //     .then((res) => {
  //       if (checked) {
  //         localStorage.setItem("keep logged in", true);
  //         localStorage.setItem("token", res.data.token);
  //       } else {
  //         sessionStorage.setItem("keep logged in", false);
  //         sessionStorage.setItem("token", res.data.token);
  //       }
  //       notify(true, "Login Successfull");

  //       setTimeout(() => {
  //         history.push("/admin/default");
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       notify(false, error.response.data.message);
  //       // console.log(error);
  //     });
  // };

  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleSubmit = () => {
    setIsLoading(true); // Set loading state to true

    let formData = new FormData();
    formData.append("email", value.email);
    formData.append("password", value.password);

    // axios
    //   .post("https://cineview.onrender.com/api/user/loginuser", formData)
    //   .then((res) => {

    //     if (checked) {
    //       localStorage.setItem("keep logged in", "true");
    //       localStorage.setItem("token", res.data.token);
    //     } else {
    //       sessionStorage.setItem("keep logged in", "false");
    //       sessionStorage.setItem("token", res.data.token);
    //     }
    //     notify(true, "Login Successful");

        
    //     setTimeout(() => {
    //       history.push("/admin/default");
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     // Handle error response
    //     notify(false, error.response.data.message);
    //     // console.log(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false); // Set loading state to false regardless of success or failure
    //   });
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      {/* react toast */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="end"
        justifyContent="end"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              name="email"
              value={value.email}
              onChange={handleChange}
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                name="password"
                value={value.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                  isChecked={checked}
                  onChange={handleCheck}
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
           { isLoading?
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              onClick={handleSubmit}
              w="100%"
              h="50"
              mb="24px"
              isLoading
              _disabled={{ pointerEvents: 'none' }} 
            >
              Sign In
            </Button>
            :<Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            onClick={handleSubmit}
            w="100%"
            h="50"
            mb="24px"
          >
            Sign In
          </Button>
           }
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default forgotPassword;
