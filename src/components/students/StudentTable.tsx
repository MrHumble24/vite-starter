// StudentsTable.tsx
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
import { Students } from "../../types/types";
import EditStudentModal from "./EditStudentModal";
import TeacherTableRow from "./StudentsTableRow";

type StudentTableProps = {
  students?: Students[];
  onDelete: (id: number) => void;
  onEdit: (user: Students) => void;
};

const StudentsTable: React.FC<StudentTableProps> = ({ students, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Students | null>(null);

  const handleEdit = (user: Students) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box overflow={"scroll"} maxW={"85vw"}>
      <Table size={"sm"} variant='stripe'>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Class</Th>

            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students?.map((user) => (
            <TeacherTableRow
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </Tbody>
      </Table>

      <EditStudentModal
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={selectedUser}
      />
    </Box>
  );
};

export default StudentsTable;
