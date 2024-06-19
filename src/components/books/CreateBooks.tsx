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
import { BooksStudent } from "../../types/types";
import { useStudents } from "../../hooks/useStudents";

const CreateBooks: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useClasses();
  const { data: students } = useStudents();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<BooksStudent>();

  const submitForm = async (data: BooksStudent) => {
    const formData = data;
    const readyData = {
      name: data.name,
      description: data.description,
    };

    try {
      setLoading(true);
      const { error, data: book } = await supabase
        .from("books")
        .insert([readyData])
        .select();

      if (error) {
        throw new Error(error.message);
      }
      console.log(students);
      console.log(data);
      const filtered = students
        ?.filter((student) => student.class == formData.classID)
        .map((student) => ({
          studentID: student.id,
          bookID: book[0].id,
          classID: data.classID,
        }));

      // Show success toast
      console.log(filtered);
      const { error: assignmentError } = await supabase
        .from("book-student")
        .insert(filtered)
        .select();

      if (assignmentError) {
        throw new Error(assignmentError.message);
      }
      toast({
        title: "Book created.",
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
        title: "Error creating book.",
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
        Book +
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new book</DrawerHeader>
          <DrawerBody>
            <Box>
              <form onSubmit={handleSubmit(submitForm)}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("name")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input {...register("description")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Class</FormLabel>
                  <Select {...register("classID")}>
                    <option value=''>Select Class</option>
                    {data?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
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

export default CreateBooks;
