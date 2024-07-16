/* eslint-disable @typescript-eslint/no-explicit-any */
// EditTeacherModal.tsx
import React, { useEffect, useState } from "react";
import {
	Avatar,
	Button,
	Center,
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
import { FaUser } from "react-icons/fa6";
import { STUDENT_STORAGE_URL } from "../../constants/constants";
import useUserStore from "../../hooks/login/useUserLogin";

type EditStudentModalProps = {
	isOpen: boolean;
	onClose: () => void;
	defaultValues: Students | null;
	isAuthorized?: boolean;
};

const EditStudentModal: React.FC<EditStudentModalProps> = ({
	isOpen,
	onClose,
	defaultValues,
	isAuthorized = true,
}) => {
	const { register, handleSubmit, reset } = useForm<Students>({
		defaultValues: defaultValues || {},
	});
	const user = useUserStore((s) => s.user);
	const { data } = useClasses();
	const toast = useToast();
	const queryClient = useQueryClient();
	const [profileImage, setProfileImage] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	const handleFormSubmit = async (formData: Students) => {
		try {
			setIsLoading(true);
			const dataWithoutClasses = { ...formData };
			delete dataWithoutClasses.classes;

			if (profileImage) {
				const filePath = `students/${formData.id}/${profileImage.name}`;
				const { error: uploadError } = await supabase.storage
					.from("students")
					.upload(filePath, profileImage);

				if (uploadError) {
					console.log(uploadError);
					throw uploadError;
				}

				dataWithoutClasses.profileImageUrl = filePath;
			}

			const { error } = await supabase
				.from("students")
				.update(dataWithoutClasses)
				.eq("id", formData.id);

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
		} finally {
			setIsLoading(false);
		}
	};

	const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setProfileImage(file);
	};

	console.log({ defaultValues });

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Students</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<Center my={4}>
							<Avatar
								size='xl'
								icon={<FaUser fontSize='1.5rem' />}
								name={`${defaultValues?.firstName} ${defaultValues?.lastName}`}
								src={
									`${STUDENT_STORAGE_URL}${defaultValues?.profileImageUrl}` ||
									""
								}
							/>
						</Center>
						<FormControl>
							<FormLabel>Profile Image</FormLabel>
							<Input
								disabled={isLoading}
								p={1}
								type='file'
								accept='image/*'
								onChange={handleProfileImageChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>First Name</FormLabel>
							<Input
								disabled={isLoading}
								{...register("firstName")}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Last Name</FormLabel>
							<Input
								disabled={isLoading}
								{...register("lastName")}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Date of Birth</FormLabel>
							<Input
								disabled={isLoading}
								type='date'
								{...register("age")}
							/>
						</FormControl>
						{isAuthorized && (
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
						)}

						<FormControl>
							<FormLabel>Telegram Username</FormLabel>
							<Input
								disabled={isLoading}
								{...register("telegramUsername")}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Username</FormLabel>
							<Input
								disabled={isLoading}
								{...register("username")}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input
								disabled={isLoading}
								{...register("password")}
							/>
						</FormControl>
						<Button
							type='submit'
							colorScheme='blue'
							isLoading={isLoading}
							mt={4}
						>
							Save
						</Button>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						isLoading={isLoading}
						onClick={onClose}
					>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditStudentModal;
