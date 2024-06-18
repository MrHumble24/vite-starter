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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../api/supabase-client";
import { useClasses } from "../../hooks/useClasses";
import { Tasks } from "../../types/types";
import { useStudents } from "../../hooks/useStudents";

const CreateTask: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useClasses();
  const { data: students } = useStudents();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<Tasks>();

  const submitForm = async (data: Tasks) => {
    try {
      setLoading(true);
      const { error, data: t } = await supabase
        .from("tasks")
        .insert([data])
        .select();

      console.log(t);
      if (error) {
        throw new Error(error.message);
      }

      const taskId = t[0].id;
      console.log({ taskId });
      if (taskId) {
        const assignedTask = students
          ?.filter((s) => s.class == data.class)
          .map((student) => {
            return {
              studentID: student.id,
              taskID: taskId,
            };
          });
        console.log({ assignedTask });
        await supabase.from("assignments").insert(assignedTask).select();
      }
      // Show success toast
      toast({
        title: "Tasks created.",
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
        title: "Error creating task.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant={"outline"} rounded={"full"} onClick={onOpen}>
        Task +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new task</DrawerHeader>

          <DrawerBody>
            <Box>
              <form onSubmit={handleSubmit(submitForm)}>
                <FormControl>
                  <FormLabel>Class</FormLabel>
                  <Select {...register("class")}>
                    <option value=''>Select Task</option>
                    {data?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type='text' {...register("name")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Scheduled Date</FormLabel>
                  <Input type='date' {...register("deadline")} />
                </FormControl>

                <Button
                  isLoading={loading}
                  type='submit'
                  colorScheme='blue'
                  mt={4}
                >
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

export default CreateTask;
