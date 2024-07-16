// ClassesTable.tsx
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
import { Classes } from "../../types/types";
import EditTeacherModal from "./EditClassesModal";
import ClassesTableRow from "./ClassesTableRow";
import { useTeachers } from "../../hooks/useTeachers";
import useUserStore from "../../hooks/login/useUserLogin";

type ClassesTableProps = {
	classes?: Classes[];
	onEdit: (user: Classes) => void;
};

const ClassesTable: React.FC<ClassesTableProps> = ({ classes }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: teachers, isLoading: teachersLoading } = useTeachers();
	const [selectedUser, setSelectedUser] = useState<Classes | null>(null);
	const [classesList, setClassesList] = useState<Classes[] | undefined>(
		classes
	);

	const handleFilterClasses = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedClass = e.target.value;
		if (selectedClass === "all") {
			setClassesList(classes);
		} else {
			const filteredStudents = classesList?.filter(
				(s) => s.teacher == Number(selectedClass)
			);
			setClassesList(filteredStudents);
		}
	};

	const handleSearchClasses = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		if (searchTerm === "") {
			setClassesList(classes);
		} else {
			const filteredStudents = classesList?.filter(
				(s) =>
					s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					s?.teachers?.firstName
						?.toLowerCase()
						?.includes(searchTerm.toLowerCase()) ||
					s?.teachers?.lastName
						?.toLowerCase()
						?.includes(searchTerm.toLowerCase())
			);
			setClassesList(filteredStudents);
		}
	};

	const handleEdit = (user: Classes) => {
		setSelectedUser(user);
		onOpen();
	};

	const user = useUserStore((s) => s.user);

	return (
		<>
			<Box
				flexWrap={"wrap"}
				gap={4}
				display={"flex"}
				my={4}
			>
				{teachersLoading && <Spinner />}
				<Select
					onChange={handleFilterClasses}
					maxW={300}
					size='sm'
				>
					<option value='all'>Filter by All Teachers</option>
					{teachers?.map((c) => (
						<option
							key={c.id}
							value={c.id}
						>
							{c?.firstName} {c?.lastName}
						</option>
					))}
				</Select>
				<Input
					maxW={300}
					size='sm'
					onChange={handleSearchClasses}
					placeholder='Search Classes'
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
							<Th>Teacher</Th>
							<Th>Stats</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{classesList
							?.filter((c) => {
								return c.teacher === user?.id;
							})
							?.map((c) => (
								<ClassesTableRow
									onEdit={handleEdit}
									data={c}
									key={c.id}
								/>
							))}
					</Tbody>
				</Table>

				<EditTeacherModal
					isOpen={isOpen}
					onClose={onClose}
					defaultValues={selectedUser}
				/>
			</Box>
		</>
	);
};

export default ClassesTable;
