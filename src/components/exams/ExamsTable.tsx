// ExamsTable.tsx
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

  const handleEdit = (user: Exams) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box overflow={"scroll"} maxW={"85vw"}>
      <Table size={"sm"} variant='stripe'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Scheduled</Th>
            <Th>Class</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams?.map((c) => (
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
  );
};

export default ExamsTable;
