// TeacherTable.tsx
import {
  Box,
  Input,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Teacher } from "../../types/types";
import EditTeacherModal from "./EditTeacherModal";
import TeacherTableRow from "./TeacherTableRow";

type TeacherTableProps = {
  users?: Teacher[];
  onDelete: (id: number) => void;
  onEdit: (user: Teacher) => void;
};

const TeacherTable: React.FC<TeacherTableProps> = ({ users, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Teacher | null>(null);
  const [teachersList, setTeachersList] = useState<Teacher[] | undefined>(
    users
  );

  const handleSearchClasses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setTeachersList(users);
    } else {
      const filteredStudents = teachersList?.filter(
        (s) =>
          s?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          s?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
      setTeachersList(filteredStudents);
    }
  };

  const handleEdit = (user: Teacher) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Box flexWrap={"wrap"} gap={4} display={"flex"} my={4}>
        <Input
          maxW={300}
          size='sm'
          onChange={handleSearchClasses}
          placeholder='Search Students'
          type='search'
        />
      </Box>
      <Box overflow={"scroll"}>
        <Table size={"sm"} variant='simple'>
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
            {teachersList?.map((user) => (
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
    </>
  );
};

export default TeacherTable;
