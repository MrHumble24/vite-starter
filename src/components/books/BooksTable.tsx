// BooksTable.tsx
import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BooksStudent } from "../../types/types";
import ClassesTableRow from "./BooksTableRow";
import EditTeacherModal from "./EditBooksModal";

type BooksTableProps = {
  books?: BooksStudent[];
  onEdit: (book: BooksStudent) => void;
};

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState<BooksStudent | null>(null);

  const handleEdit = (book: BooksStudent) => {
    setSelectedBook(book);
    onOpen();
  };

  return (
    <Box overflow={"scroll"}>
      <Table size={"sm"} variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books?.map((c) => (
            <ClassesTableRow onEdit={handleEdit} data={c} key={c.id} />
          ))}
        </Tbody>
      </Table>

      <EditTeacherModal
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={selectedBook}
      />
    </Box>
  );
};

export default BooksTable;
