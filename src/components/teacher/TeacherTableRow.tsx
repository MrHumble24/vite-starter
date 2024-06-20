// TeacherTableRow.tsx
import React, { useState } from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Teacher } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../../helpers/deleteRecors";
import { ReloadPage } from "../../utils/reload";

type TeacherTableRowProps = {
  user: Teacher;
  onEdit: (user: Teacher) => void;
  onDelete: (id: number) => void;
};

const TeacherTableRow: React.FC<TeacherTableRowProps> = ({ user, onEdit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const qc = useQueryClient();
  const handleDelete = async () => {
    setIsWaiting(true);
    await deleteRecord({ table: "teachers", id: user.id });
    setIsWaiting(false);
    qc.invalidateQueries();
    ReloadPage();
  };
  return (
    <Tr>
      <Td>{user.firstName}</Td>
      <Td>{user.lastName}</Td>
      <Td>{user.username}</Td>
      <Td cursor={"help"} onClick={() => setPasswordVisible(!passwordVisible)}>
        {passwordVisible ? user.password : "*********"}
      </Td>
      <Td>{user.phone}</Td>
      <Td>{user.role}</Td>
      <Td>
        <IconButton
          aria-label='Edit user'
          icon={<EditIcon />}
          onClick={() => onEdit(user)}
          mr={2}
          my={2}
        />
        <IconButton
          aria-label='Delete user'
          icon={<DeleteIcon />}
          mr={2}
          isLoading={isWaiting}
          my={2}
          onClick={handleDelete}
        />
      </Td>
    </Tr>
  );
};

export default TeacherTableRow;
