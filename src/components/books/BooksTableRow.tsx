// BooksTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { BooksStudent } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../../helpers/deleteRecors";
import { ReloadPage } from "../../utils/reload";

type BooksRowProps = {
  data: BooksStudent;
  onEdit: (data: BooksStudent) => void;
};

const BooksTableRow: React.FC<BooksRowProps> = ({ data, onEdit }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const qc = useQueryClient();
  const handleDelete = async () => {
    setIsWaiting(true);
    await deleteRecord({ table: "books", id: data.id });
    setIsWaiting(false);
    qc.invalidateQueries();
    ReloadPage();
  };
  return (
    <Tr>
      <Td>{data?.books?.name}</Td>
      <Td>{data?.books?.description}</Td>
      <Td>{data?.classes?.name}</Td>

      <Td>
        <IconButton
          aria-label='Edit book'
          icon={<EditIcon />}
          onClick={() => onEdit(data)}
          mr={2}
          my={2}
        />
        <IconButton
          aria-label='Delete book'
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

export default BooksTableRow;
