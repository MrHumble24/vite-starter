// ClassesTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Exams } from "../../types/types";
import moment from "moment";
import { deleteRecord } from "../../helpers/deleteRecors";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadPage } from "../../utils/reload";

type ExamsRowProps = {
  data: Exams;
  onEdit: (data: Exams) => void;
};

const ExamsTableRow: React.FC<ExamsRowProps> = ({ data, onEdit }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const qc = useQueryClient();
  const handleDelete = async () => {
    setIsWaiting(true);
    await deleteRecord({ table: "exams", id: data.id });
    setIsWaiting(false);
    qc.invalidateQueries();
    ReloadPage();
  };
  return (
    <Tr>
      <Td>{data.name}</Td>
      <Td>{moment(data.scheduled).format("MM/DD/YY h:mm")}</Td>
      <Td>{data.classes?.name}</Td>
      <Td>
        <IconButton
          aria-label='Edit exam'
          icon={<EditIcon />}
          onClick={() => onEdit(data)}
          mr={2}
          my={2}
        />
        <IconButton
          isLoading={isWaiting}
          aria-label='Delete exam'
          icon={<DeleteIcon />}
          onClick={handleDelete}
          mr={2}
          my={2}
        />
      </Td>
    </Tr>
  );
};

export default ExamsTableRow;
