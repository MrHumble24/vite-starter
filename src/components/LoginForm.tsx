// src/components/LoginForm.tsx
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../api/supabase-client";
import useUserStore from "../hooks/login/useUserLogin";
import Logo from "./Logo";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (params.user == "students") {
      const {
        data: response,
        error,
        status,
      } = await supabase
        .from(String(params.user))
        .select("*, classes(*)")
        .eq("username", data.username)
        .eq("password", data.password)
        .order("created_at", { ascending: false })
        .single();
      if (error) {
        if (error.details == "The result contains 0 rows") {
          toast({
            title: "User not found",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
      if (status == 200) {
        setUser(response);
        navigate("/student/page");
      }

      console.log(response, error, status);
    } else if (params.user == "admins") {
      const { data: response, error } = await supabase
        .from(String(params.user))
        .select("*")
        .eq("username", data.username)
        .eq("password", data.password)
        .order("created_at", { ascending: false })
        .single();
      if (error) {
        if (error.details == "The result contains 0 rows") {
          toast({
            title: "User not found",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
      if (error == null) {
        setUser(response);
        navigate("/admin/students");
      }
      console.log(response, error);
    } else if (params.user == "teachers") {
      const { data: response, error } = await supabase
        .from(String(params.user))
        .select("*")
        .eq("username", data.username)
        .eq("password", data.password)
        .order("created_at", { ascending: false })
        .single();
      if (error) {
        if (error.details == "The result contains 0 rows") {
          toast({
            title: "User not found",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setUser(response);
      }
      if (error == null) {
        setUser(response);
        navigate("/teacher/students");
      }
      console.log(response, error);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
      className='bg'
    >
      <Box
        bg={"white"}
        w='100%'
        maxW='md'
        mx='auto'
        p={6}
        borderWidth={1}
        borderRadius='lg'
      >
        <Center my={5}>
          <Logo width={250} />
        </Center>
        <Heading textAlign={"center"} as='h1' size='md' mb={6}>
          Login as {params.user}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                id='username'
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
