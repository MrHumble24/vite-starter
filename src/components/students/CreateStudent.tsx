/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Students } from "../../types/types";
import { supabase } from "../../api/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { useClasses } from "../../hooks/useClasses";

const CreateStudent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useClasses();
  const { register, handleSubmit, reset } = useForm<Students>();

  const submitForm = async (data: Students) => {
    try {
      const { error } = await supabase.from("students").insert([data]).select();

      if (error) {
        throw new Error(error.message);
      }

      // Show success toast
      toast({
        title: "Student created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      queryClient.invalidateQueries();
      onClose();
      reset();
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Error creating student.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button variant={"outline"} rounded={"full"} onClick={onOpen}>
        Student +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new student</DrawerHeader>

          <DrawerBody>
            <Box>
              <form onSubmit={handleSubmit(submitForm)}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input {...register("firstName")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input {...register("lastName")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input {...register("username")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Class</FormLabel>
                  <Select {...register("class")}>
                    <option value=''>Select Class</option>
                    {data?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type='password' {...register("password")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input {...register("age")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Date Enrollment</FormLabel>
                  <Input type='date' {...register("dateEnrollment")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Failed Attempts</FormLabel>
                  <Input type='number' {...register("failedAttempts")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Telegram Username</FormLabel>
                  <Input {...register("telegramUsername")} />
                </FormControl>

                <Button type='submit' colorScheme='blue' mt={4}>
                  Submit
                </Button>
              </form>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {/* You can add a submit button inside the form */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateStudent;
