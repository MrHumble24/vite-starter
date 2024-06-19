// ClassesTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Classes } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../../helpers/deleteRecors";

type TableRowProps = {
  data: Classes;
  onEdit: (data: Classes) => void;
};

const ClassesTableRow: React.FC<TableRowProps> = ({ data, onEdit }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const qc = useQueryClient();
  const handleDelete = async () => {
    setIsWaiting(true);
    await deleteRecord({ table: "classes", id: data.id });
    setIsWaiting(false);
    qc.invalidateQueries();
  };
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>
        {data.teachers?.firstName} {data?.teachers?.lastName}
      </Td>

      <Td>
        <IconButton
          aria-label='Edit class'
          icon={<EditIcon />}
          onClick={() => onEdit(data)}
          mr={2}
          my={2}
        />
        <IconButton
          aria-label='Delete class'
          icon={<DeleteIcon />}
          isLoading={isWaiting}
          onClick={handleDelete}
          mr={2}
          my={2}
        />
      </Td>
    </Tr>
  );
};

export default ClassesTableRow;