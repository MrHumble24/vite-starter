// ClassesTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { Classes } from "../../types/types";

type TableRowProps = {
  data: Classes;
  onEdit: (data: Classes) => void;
};

const ClassesTableRow: React.FC<TableRowProps> = ({ data, onEdit }) => {
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>
        {data.teachers?.firstName} {data?.teachers?.lastName}
      </Td>

      <Td>
        <IconButton
          aria-label='Edit user'
          icon={<EditIcon />}
          onClick={() => onEdit(data)}
          mr={2}
        />
        <IconButton
          aria-label='Delete user'
          icon={<DeleteIcon />}
          onClick={() => data.id}
        />
      </Td>
    </Tr>
  );
};

export default ClassesTableRow;
