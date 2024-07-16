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
import { Exams } from "../../types/types";
import { useStudents } from "../../hooks/useStudents";
import { ReloadPage } from "../../utils/reload";
import useUserStore from "../../hooks/login/useUserLogin";

const CreateExam: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { data: students } = useStudents();
	const queryClient = useQueryClient();
	const { data } = useClasses();
	const { register, handleSubmit, reset } = useForm<Exams>();
	const [loading, setLoading] = useState(false);
	const user = useUserStore((s) => s.user);

	const submitForm = async (data: Exams) => {
		try {
			setLoading(true);
			const { data: exam, error } = await supabase
				.from("exams")
				.insert([data])
				.select();

			if (error) {
				throw new Error(error.message);
			}

			// Show success toast
			toast({
				title: "Exam created.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});

			console.log({
				students: students?.filter((student) => student.class == data.class),
				data,
			});

			const filteredData = students
				?.filter((student) => student.class == data.class)
				.map((s) => ({ studentID: s.id, examID: exam[0].id }));

			const { data: assigned, error: ex } = await supabase
				.from("exam-student")
				.insert(filteredData)
				.select();

			console.log({ assigned, ex });

			queryClient.invalidateQueries({ queryKey: ["exams"] });
			queryClient.invalidateQueries({ queryKey: ["exam-student"] });
			ReloadPage();
			onClose();
			reset();
		} catch (error: any) {
			// Show error toast
			toast({
				title: "Error creating exam.",
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
			<Button
				variant={"outline"}
				rounded={"full"}
				onClick={onOpen}
			>
				Exam +
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Create a new exam</DrawerHeader>

					<DrawerBody>
						<Box>
							<form onSubmit={handleSubmit(submitForm)}>
								<FormControl my={4}>
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
								<FormControl my={4}>
									<FormLabel>Name</FormLabel>
									<Input
										type='text'
										{...register("name")}
									/>
								</FormControl>
								<FormControl my={4}>
									<FormLabel>Scheduled Date</FormLabel>
									<Input
										type='date'
										{...register("scheduled")}
									/>
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
						<Button
							variant='outline'
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
						{/* You can add a submit button inside the form */}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default CreateExam;
