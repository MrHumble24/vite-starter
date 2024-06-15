// TeacherTable.tsx
import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useDisclosure,
} from "@chakra-ui/react";
import TeacherTableRow from "./TeacherTableRow";
import EditTeacherModal from "./EditTeacherModal";
import { Teacher } from "../../types/types";

type TeacherTableProps = {
  users?: Teacher[];
  onDelete: (id: number) => void;
  onEdit: (user: Teacher) => void;
};

const TeacherTable: React.FC<TeacherTableProps> = ({ users, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Teacher | null>(null);

  const handleEdit = (user: Teacher) => {
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
            <Th>Phone</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <TeacherTableRow
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={onDelete}
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
  );
};

export default TeacherTable;
