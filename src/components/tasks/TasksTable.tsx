// TasksTable.tsx
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
import { Tasks } from "../../types/types";
import EditExamsModal from "./EditTasksModal";
import ClassesTableRow from "./TasksTableRow";

type TasksTableProps = {
  tasks?: Tasks[];
  onEdit: (user: Tasks) => void;
};

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);

  const handleEdit = (user: Tasks) => {
    setSelectedTask(user);
    onOpen();
  };

  return (
    <Box overflow={"scroll"}>
      <Table size={"sm"} variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Deadline</Th>
            <Th>Class</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks?.map((c) => (
            <ClassesTableRow onEdit={handleEdit} data={c} key={c.id} />
          ))}
        </Tbody>
      </Table>

      <EditExamsModal
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={selectedTask}
      />
    </Box>
  );
};

export default TasksTable;
