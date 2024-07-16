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
import { Exams } from "../../types/types";
import { useClasses } from "../../hooks/useClasses";
import { ReloadPage } from "../../utils/reload";
import useUserStore from "../../hooks/login/useUserLogin";

type EditExamsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	defaultValues: Exams | null;
};

const EditExamsModal: React.FC<EditExamsModalProps> = ({
	isOpen,
	onClose,
	defaultValues,
}) => {
	const { register, handleSubmit, reset } = useForm<Exams>({
		defaultValues: defaultValues || {},
	});

	const { data } = useClasses();
	const toast = useToast();
	const queryClient = useQueryClient();
	const user = useUserStore((s) => s.user);
	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	const handleFormSubmit = async (data: Exams) => {
		try {
			const dataWithoutClasses = { ...data };
			delete dataWithoutClasses.classes;
			const { error } = await supabase
				.from("exams")
				.update(dataWithoutClasses)
				.eq("id", data.id);

			if (error) throw error;

			queryClient.invalidateQueries();
			ReloadPage();

			toast({
				title: "Exam updated.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});

			onClose();
		} catch (error: any) {
			toast({
				title: "Error updating exam.",
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
				<ModalHeader>Edit Exams</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input {...register("name")} />
						</FormControl>
						<FormControl>
							<FormLabel>Scheduled</FormLabel>
							<Input
								type='datetime-local'
								{...register("scheduled")}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Class</FormLabel>
							<Select {...register("class")}>
								<option value=''>Select Class</option>
								{data
									?.filter((item) => item.teacher === user?.id)
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

export default EditExamsModal;
