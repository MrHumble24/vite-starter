// ClassesTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { Exams } from "../../types/types";

type ExamsRowProps = {
  data: Exams;
  onEdit: (data: Exams) => void;
};

const ExamsTableRow: React.FC<ExamsRowProps> = ({ data, onEdit }) => {
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>{data.scheduled}</Td>
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
