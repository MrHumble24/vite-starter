// ExamsTable.tsx
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
import { Exams } from "../../types/types";
import EditExamsModal from "./EditExamsModal";
import ClassesTableRow from "./ExamsTableRow";

type ExamsTableProps = {
  exams?: Exams[];
  onEdit: (user: Exams) => void;
};

const ExamsTable: React.FC<ExamsTableProps> = ({ exams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Exams | null>(null);
  const { data: classes, isLoading: classesLoading } = useClasses();
  const [examsList, setExamsList] = useState<Exams[] | undefined>(exams);

  const handleFilterClasses = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    if (selectedClass === "all") {
      setExamsList(exams);
    } else {
      const filteredExams = examsList?.filter(
        (s) => s?.classes?.id == Number(selectedClass)
      );
      setExamsList(filteredExams);
    }
  };

  const handleSearchClasses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setExamsList(exams);
    } else {
      const filteredExams = examsList?.filter(
        (s) =>
          s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s?.classes?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          s?.scheduled?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
      setExamsList(filteredExams);
    }
  };

  const handleEdit = (user: Exams) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Box flexWrap={"wrap"} gap={4} display={"flex"} my={4}>
        {classesLoading && <Spinner />}
        <Select onChange={handleFilterClasses} maxW={300} size='sm'>
          <option value='all'>Filter by All classes</option>
          {classes?.map((c) => (
            <option key={c.id} value={c.id}>
              class "{c?.name}" by {c?.teachers?.firstName}{" "}
              {c?.teachers?.lastName}
            </option>
          ))}
        </Select>
        <Input
          maxW={300}
          size='sm'
          onChange={handleSearchClasses}
          placeholder='Search Exams'
          type='search'
        />
      </Box>
      <Box overflow={"scroll"}>
        <Table size={"sm"} variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Scheduled</Th>
              <Th>Class</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {examsList?.map((c) => (
              <ClassesTableRow onEdit={handleEdit} data={c} key={c.id} />
            ))}
          </Tbody>
        </Table>

        <EditExamsModal
          isOpen={isOpen}
          onClose={onClose}
          defaultValues={selectedUser}
        />
      </Box>
    </>
  );
};

export default ExamsTable;
