// ClassesTable.tsx
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
import { Classes } from "../../types/types";
import EditTeacherModal from "./EditClassesModal";
import ClassesTableRow from "./TeacherTableRow";

type ClassesTableProps = {
  classes?: Classes[];
  onEdit: (user: Classes) => void;
};

const ClassesTable: React.FC<ClassesTableProps> = ({ classes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Classes | null>(null);

  const handleEdit = (user: Classes) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box overflow={"scroll"}>
      <Table size={"sm"} variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Teacher</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classes?.map((c) => (
            <ClassesTableRow onEdit={handleEdit} data={c} key={c.id} />
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

export default ClassesTable;
