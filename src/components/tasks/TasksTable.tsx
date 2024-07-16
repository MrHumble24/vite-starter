// TasksTable.tsx
import {
	Box,
	Input,
	Select,
	Spinner,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Tasks } from "../../types/types";
import EditExamsModal from "./EditTasksModal";
import ClassesTableRow from "./TasksTableRow";

import { useClasses } from "../../hooks/useClasses";
import useUserStore from "../../hooks/login/useUserLogin";

type TasksTableProps = {
	tasks?: Tasks[];
	onEdit: (user: Tasks) => void;
};

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
	const [tasksList, setTasksList] = useState<Tasks[] | undefined>(tasks);
	const { data: classes, isLoading: classesLoading } = useClasses();
	const user = useUserStore((s) => s.user);
	const handleFilterClasses = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedClass = e.target.value;
		if (selectedClass === "all") {
			setTasksList(tasks);
		} else {
			const filteredStudents = tasksList?.filter(
				(s) => s.class == Number(selectedClass)
			);
			setTasksList(filteredStudents);
		}
	};

	const handleSearchClasses = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		if (searchTerm === "") {
			setTasksList(tasks);
		} else {
			const filteredStudents = tasksList?.filter(
				(s) =>
					s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					s?.classes?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
					s?.deadline?.toLowerCase()?.includes(searchTerm.toLowerCase())
			);
			setTasksList(filteredStudents);
		}
	};

	const handleEdit = (user: Tasks) => {
		setSelectedTask(user);
		onOpen();
	};

	return (
		<>
			<Box
				flexWrap={"wrap"}
				gap={4}
				display={"flex"}
				my={4}
			>
				{classesLoading && <Spinner />}
				<Select
					onChange={handleFilterClasses}
					maxW={300}
					size='sm'
				>
					<option value='all'>Filter by All Classes</option>
					{classes
						?.filter((c) => c.teacher === user?.id)
						?.map((c) => (
							<option
								key={c.id}
								value={c.id}
							>
								class "{c?.name}" by {c?.teachers?.firstName}{" "}
								{c?.teachers?.lastName}
							</option>
						))}
				</Select>
				<Input
					maxW={300}
					size='sm'
					onChange={handleSearchClasses}
					placeholder='Search Tasks'
					type='search'
				/>
			</Box>
			<Box overflow={"scroll"}>
				<Table
					size={"sm"}
					variant='simple'
				>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Deadline</Th>
							<Th>Class</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{tasksList?.map((c) => (
							<ClassesTableRow
								onEdit={handleEdit}
								data={c}
								key={c.id}
							/>
						))}
					</Tbody>
				</Table>

				<EditExamsModal
					isOpen={isOpen}
					onClose={onClose}
					defaultValues={selectedTask}
				/>
			</Box>
		</>
	);
};

export default TasksTable;
