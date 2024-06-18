/* eslint-disable @typescript-eslint/no-explicit-any */
// EditTeacherModal.tsx
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../api/supabase-client";
import { useClasses } from "../../hooks/useClasses";
import { BooksStudent } from "../../types/types";

type EditBooksModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: BooksStudent | null;
};

const EditBooksModal: React.FC<EditBooksModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const { register, handleSubmit, reset } = useForm<BooksStudent>({
    defaultValues: defaultValues || {},
  });

  const { data } = useClasses();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: BooksStudent) => {
    try {
      const readyData = { ...data };
      console.log({ data });

      const { error } = await supabase
        .from("books")
        .update(readyData)
        .eq("id", data.id);

      if (error) throw error;

      queryClient.invalidateQueries();

      toast({
        title: "Book updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error updating class.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type='submit' colorScheme='blue' mt={4}>
              Save
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBooksModal;
