/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
import { Classes } from "../../types/types";
import { supabase } from "../../api/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { useTeachers } from "../../hooks/useTeachers";
import { ReloadPage } from "../../utils/reload";

const CreateClasses: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useTeachers();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Classes>();

  const submitForm = async (data: Classes) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("classes").insert([data]).select();

      if (error) {
        throw new Error(error.message);
      }

      // Show success toast
      toast({
        title: "Class created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      queryClient.invalidateQueries();
      ReloadPage();
      onClose();
      reset();
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Error creating class.",
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
        Class +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new class</DrawerHeader>

          <DrawerBody>
            <Box>
              <form onSubmit={handleSubmit(submitForm)}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("name")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Teacher</FormLabel>
                  <Select {...register("teacher")}>
                    <option value=''>Select teacher</option>
                    {data?.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                      </option>
                    ))}
                  </Select>
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

export default CreateClasses;
