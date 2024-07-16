// BooksTable.tsx
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
import { useClasses } from "../../hooks/useClasses";
import { BooksStudent } from "../../types/types";
import ClassesTableRow from "./BooksTableRow";
import EditTeacherModal from "./EditBooksModal";
import useUserStore from "../../hooks/login/useUserLogin";

type BooksTableProps = {
	books?: BooksStudent[];
	onEdit: (book: BooksStudent) => void;
};

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedBook, setSelectedBook] = useState<BooksStudent | null>(null);
	const [booksList, setBooksList] = useState<BooksStudent[] | undefined>(books);
	const { data: classes, isLoading: classesLoading } = useClasses();
	const user = useUserStore((s) => s.user);

	const handleFilterBooks = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedClass = e.target.value;

		if (selectedClass === "all") {
			setBooksList(books);
		} else {
			const filteredBooks = booksList?.filter((b) => {
				console.log(b);
				return b.classID == Number(selectedClass);
			});
			console.log(filteredBooks?.length);
			if (filteredBooks?.length == 0) {
				setBooksList(books);
				return;
			}
			setBooksList(filteredBooks);
		}
	};

	const handleSearchClasses = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		if (searchTerm === "") {
			setBooksList(books);
		} else {
			const filteredBooks = booksList?.filter(
				(s) =>
					s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					s?.books?.description
						?.toLowerCase()
						?.includes(searchTerm.toLowerCase()) ||
					s?.classes?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
			);
			setBooksList(filteredBooks);
		}
	};
	const handleEdit = (book: BooksStudent) => {
		setSelectedBook(book);
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
					onChange={handleFilterBooks}
					maxW={300}
					size='sm'
				>
					<option value='all'>Filter by All Classes</option>
					{classes
						?.filter((c) => {
							if (user.admin) return true;
							return c.teacher === user?.id;
						})
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
					placeholder='Search Books'
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
							<Th>Description</Th>
							<Th>Class</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{booksList?.map((c) => (
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
					defaultValues={selectedBook}
				/>
			</Box>
		</>
	);
};

export default BooksTable;
