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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "../../api/supabase-client";
import { Teacher } from "../../types/types";
import { useState } from "react";
import { ReloadPage } from "../../utils/reload";

type TeacherFormProps = {
  defaultValues?: Teacher;
};

const CreateTeacher: React.FC<TeacherFormProps> = ({ defaultValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<Teacher>({
    defaultValues,
  });

  const submitForm = async (data: Teacher) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("teachers").insert([data]).select();

      if (error) {
        throw new Error(error.message);
      }

      // Show success toast
      toast({
        title: "Teacher created.",
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
        title: "Error creating teacher.",
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
        Teacher +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create Teacher account</DrawerHeader>

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
                  <FormLabel>Password</FormLabel>
                  <Input type='password' {...register("password")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input type='tel' {...register("phone")} />
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
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateTeacher;
