import {
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { SignUpForm, User } from "../types/user";
import { signUp } from "../services/api-client";
import useStore from "../store/store";
import { errorWithTimer } from "../utils";

const Registration = () => {
  const { register, handleSubmit, formState } = useForm<SignUpForm>();
  const { errors } = formState;
  const { error, addError } = useStore();
  const navigate = useNavigate();
  const transferOnSuccess = (user: User) => {
    sessionStorage.setItem("currentUser", user._id);
    navigate("/admin");
  };

  const onSubmit = (data: SignUpForm) => {
    console.log(data);
    signUp(data, transferOnSuccess, errorWithTimer, addError);
  };

  return (
    <Box
      bgColor={"grey"}
      width={"100vl"}
      height={"100vh"}
      boxSizing={"border-box"}
      paddingTop={"20vh"}
    >
      {error !== "" && (
        <Box
          width={"100%"}
          height={"50px"}
          bgColor={"red"}
          padding={"10px"}
          paddingX={"30px"}
          color={"white"}
          fontSize={"20px"}
          fontWeight={"bold"}
          position={"absolute"}
          top={"0"}
          zIndex={"1"}
        >
          {error}
        </Box>
      )}
      <Box
        width={"500px"}
        bgColor={"white"}
        padding={10}
        borderRadius={10}
        marginX={"auto"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          paddingBottom={5}
        >
          <Text
            textTransform={"uppercase"}
            fontWeight={"bold"}
            fontStyle={"italic"}
            color={"teal"}
            fontSize={20}
          >
            Admin Panel
          </Text>
          <Text
            fontWeight={"bold"}
            fontStyle={"italic"}
            color={"teal"}
            fontSize={15}
            alignSelf={"end"}
          >
            Registration
          </Text>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired paddingBottom={5}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Min length is 5",
                },
              })}
              placeholder="example@mail.com"
              type="email"
              required
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired paddingBottom={5}>
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password", {
                required: "This field is required",
              })}
              placeholder="Password"
              type="password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired paddingBottom={5}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              {...register("passwordConf", {
                required: "This field is required",
              })}
              placeholder="Password"
              type="password"
            />
            <FormErrorMessage>{errors.passwordConf?.message}</FormErrorMessage>
          </FormControl>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button as={NavLink} to={"/"}>
              Back
            </Button>
            <Input
              as={Button}
              width={"fit-content"}
              bgColor={"green.600"}
              color={"white"}
              type="submit"
            >
              Register
            </Input>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registration;
