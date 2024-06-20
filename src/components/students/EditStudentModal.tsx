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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Students } from "../../types/types";
import { supabase } from "../../api/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { useClasses } from "../../hooks/useClasses";
import { ReloadPage } from "../../utils/reload";

type EditStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: Students | null;
};

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const { register, handleSubmit, reset } = useForm<Students>({
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

  const handleFormSubmit = async (data: Students) => {
    try {
      const dataWithoutClasses = { ...data };
      delete dataWithoutClasses.classes;
      const { error } = await supabase
        .from("students")
        .update(dataWithoutClasses)
        .eq("id", data.id);

      if (error) throw error;

      queryClient.invalidateQueries();
      ReloadPage();
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
        <ModalHeader>Edit Students</ModalHeader>
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
              <FormLabel>Date of Birth</FormLabel>
              <Input type='date' {...register("age")} />
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
              <FormLabel>Telegram Username</FormLabel>
              <Input {...register("telegramUsername")} />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input {...register("username")} />
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

export default EditStudentModal;
