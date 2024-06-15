// ClassesTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { Tasks } from "../../types/types";

type TasksRowProps = {
  data: Tasks;
  onEdit: (data: Tasks) => void;
};

const ExamsTableRow: React.FC<TasksRowProps> = ({ data, onEdit }) => {
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>{data.deadline}</Td>
      <Td>{data.classes?.name}</Td>
      <Td>
        <IconButton
          aria-label='Edit exam'
          icon={<EditIcon />}
          onClick={() => onEdit(data)}
          mr={2}
        />
        <IconButton
          aria-label='Delete exam'
          icon={<DeleteIcon />}
          onClick={() => data.id}
        />
      </Td>
    </Tr>
  );
};

export default ExamsTableRow;
