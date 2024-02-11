import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { Link, useNavigate } from "react-router-dom";

type FormValue = {
  email: string;
  password: string;
};

const signIn = (data: FormValue, onSuccess: () => void) => {
  const token = localStorage.getItem("admin-token");
  if (token) {
    apiClient
      .post("/auth", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        onSuccess();
      })
      .catch((err) => console.log(err));
  }
};

const Login = () => {
  const { register, handleSubmit, formState } = useForm<FormValue>();
  const { errors } = formState;
  const navigate = useNavigate();
  const transferOnSuccess = () => {
    navigate("/admin");
  };

  const onSubmit = (data: FormValue) => {
    console.log(data);
    signIn(data, transferOnSuccess);
  };

  return (
    <Box
      bgColor={"grey"}
      width={"100vl"}
      height={"100vh"}
      boxSizing={"border-box"}
      padding={"20vh"}
    >
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
            Log in
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
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired paddingBottom={5}>
            <FormLabel>Password</FormLabel>
            <Input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Min length is 5",
                },
              })}
              placeholder="Password"
              type="password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button as={Link} to={"/signup"}>
              or Sign Up
            </Button>
            <Input
              as={Button}
              width={"fit-content"}
              bgColor={"green.600"}
              color={"white"}
              type="submit"
            >
              Login
            </Input>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
