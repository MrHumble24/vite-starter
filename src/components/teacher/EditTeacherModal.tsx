/* eslint-disable @typescript-eslint/no-explicit-any */
// EditTeacherModal.tsx
import React, { useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Teacher } from "../../types/types";
import { supabase } from "../../api/supabase-client";
import { useQueryClient } from "@tanstack/react-query";

type EditTeacherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: Teacher | null;
};

const EditTeacherModal: React.FC<EditTeacherModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const { register, handleSubmit, reset } = useForm<Teacher>({
    defaultValues: defaultValues || {},
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: Teacher) => {
    try {
      const dataWithoutClasses = { ...data };
      delete dataWithoutClasses.classes;
      const { error } = await supabase
        .from("teachers")
        .update(dataWithoutClasses)
        .eq("id", data.id);

      if (error) throw error;

      queryClient.invalidateQueries();

      toast({
        title: "User updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error updating user.",
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
        <ModalHeader>Edit Teacher</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <FormLabel>Role</FormLabel>
              <Input {...register("role")} />
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

export default EditTeacherModal;
