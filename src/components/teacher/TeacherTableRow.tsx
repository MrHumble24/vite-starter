// TeacherTableRow.tsx
import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Teacher } from "../../types/types";

type TeacherTableRowProps = {
  user: Teacher;
  onEdit: (user: Teacher) => void;
  onDelete: (id: number) => void;
};

const TeacherTableRow: React.FC<TeacherTableRowProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <Tr>
      <Td>{user.firstName}</Td>
      <Td>{user.lastName}</Td>
      <Td>{user.username}</Td>
      <Td>{user.password}</Td>
      <Td>{user.phone}</Td>
      <Td>{user.role}</Td>
      <Td>
        <IconButton
          aria-label='Edit user'
          icon={<EditIcon />}
          onClick={() => onEdit(user)}
          mr={2}
        />
        <IconButton
          aria-label='Delete user'
          icon={<DeleteIcon />}
          onClick={() => onDelete(user.id)}
        />
      </Td>
    </Tr>
  );
};

export default TeacherTableRow;
