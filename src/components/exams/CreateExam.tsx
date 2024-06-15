/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../api/supabase-client";
import { useClasses } from "../../hooks/useClasses";
import { Exams } from "../../types/types";

const CreateExam: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useClasses();
  const { register, handleSubmit, reset } = useForm<Exams>();

  const submitForm = async (data: Exams) => {
    try {
      const { error } = await supabase.from("exams").insert([data]).select();

      if (error) {
        throw new Error(error.message);
      }

      // Show success toast
      toast({
        title: "Exam created.",
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
        title: "Error creating exam.",
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
        Exam +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new exam</DrawerHeader>

          <DrawerBody>
            <Box>
              <form onSubmit={handleSubmit(submitForm)}>
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
                  <FormLabel>Name</FormLabel>
                  <Input type='number' {...register("name")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Scheduled Date</FormLabel>
                  <Input type='date' {...register("scheduled")} />
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

export default CreateExam;
