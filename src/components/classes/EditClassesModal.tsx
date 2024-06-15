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
import { Classes } from "../../types/types";
import { useTeachers } from "../../hooks/useTeachers";

type EditClassesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: Classes | null;
};

const EditClassesModal: React.FC<EditClassesModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
}) => {
  const { register, handleSubmit, reset } = useForm<Classes>({
    defaultValues: defaultValues || {},
  });

  const { data } = useTeachers();
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: Classes) => {
    try {
      const readyData = { ...data };
      delete readyData.teachers;
      const { error } = await supabase
        .from("classes")
        .update(readyData)
        .eq("id", data.id);

      if (error) throw error;

      queryClient.invalidateQueries();

      toast({
        title: "Class updated.",
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
        <ModalHeader>Edit Classes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} />
            </FormControl>
            <FormControl>
              <FormLabel>Teacher</FormLabel>
              <Select {...register("teacher")}>
                <option value=''>Select Teacher</option>
                {data?.map((teacher) => (
                  <option value={teacher.id} key={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
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

export default EditClassesModal;
