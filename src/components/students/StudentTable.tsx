// StudentsTable.tsx
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
import { Students } from "../../types/types";
import EditStudentModal from "./EditStudentModal";
import TeacherTableRow from "./StudentsTableRow";
import { useClasses } from "../../hooks/useClasses";

type StudentTableProps = {
  students?: Students[];
  onDelete: (id: number) => void;
  onEdit: (user: Students) => void;
};

const StudentsTable: React.FC<StudentTableProps> = ({ students, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Students | null>(null);
  const { data: classes, isLoading: classesLoading } = useClasses();

  const [studentList, setStudentList] = useState<Students[] | undefined>(
    students
  );

  const handleFilterStudents = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    if (selectedClass === "all") {
      setStudentList(students);
    } else {
      const filteredStudents = students?.filter(
        (s) => s.class == Number(selectedClass)
      );
      setStudentList(filteredStudents);
    }
  };

  const handleSearchStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setStudentList(students);
    } else {
      const filteredStudents = students?.filter(
        (s) =>
          s?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.classes?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudentList(filteredStudents);
    }
  };

  const handleEdit = (user: Students) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Box flexWrap={"wrap"} gap={4} display={"flex"} my={4}>
        {classesLoading && <Spinner />}
        <Select onChange={handleFilterStudents} maxW={300} size='sm'>
          <option value='all'>Filter by All Classes</option>
          {classes?.map((c) => (
            <option key={c.id} value={c.id}>
              Class "{c.name}" by {c?.teachers?.firstName}{" "}
              {c?.teachers?.lastName}
            </option>
          ))}
        </Select>
        <Input
          maxW={300}
          size='sm'
          onChange={handleSearchStudents}
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
              <Th>Class</Th>
              <Th>Tasks</Th>
              <Th>Exams</Th>
              <Th>Books</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {studentList?.map((user) => (
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
    </>
  );
};

export default StudentsTable;
