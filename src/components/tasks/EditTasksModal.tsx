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
import { Tasks } from "../../types/types";
import { useClasses } from "../../hooks/useClasses";
import { ReloadPage } from "../../utils/reload";
import useUserStore from "../../hooks/login/useUserLogin";

type EditTasksModalProps = {
	isOpen: boolean;
	onClose: () => void;
	defaultValues: Tasks | null;
};

const EditTasksModal: React.FC<EditTasksModalProps> = ({
	isOpen,
	onClose,
	defaultValues,
}) => {
	const { register, handleSubmit, reset } = useForm<Tasks>({
		defaultValues: defaultValues || {},
	});
	const user = useUserStore((s) => s.user);
	const { data } = useClasses();
	const toast = useToast();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	const handleFormSubmit = async (data: Tasks) => {
		try {
			const dataWithoutClasses = { ...data };
			delete dataWithoutClasses.classes;
			const { error } = await supabase
				.from("tasks")
				.update(dataWithoutClasses)
				.eq("id", data.id);

			if (error) throw error;

			queryClient.invalidateQueries();
			ReloadPage();

			toast({
				title: "Task updated.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});

			onClose();
		} catch (error: any) {
			toast({
				title: "Error updating task.",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Tasks</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input {...register("name")} />
						</FormControl>
						<FormControl>
							<FormLabel>Deadline</FormLabel>
							<Input
								type='datetime-local'
								{...register("deadline")}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Class</FormLabel>
							<Select {...register("class")}>
								<option value=''>Select Class</option>
								{data
									?.filter((item) => {
										if (user.admin) return true;
										return item.teacher === user?.id;
									})
									?.map((item) => (
										<option
											value={item.id}
											key={item.id}
										>
											{item.name}
										</option>
									))}
							</Select>
						</FormControl>
						<Button
							type='submit'
							colorScheme='blue'
							mt={4}
						>
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

export default EditTasksModal;
