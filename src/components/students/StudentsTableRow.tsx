// TeacherTableRow.tsx
import React from "react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Students } from "../../types/types";
import { MdOutlineTaskAlt } from "react-icons/md";
import StudentTasks from "./StudentTasks";
type StudentsTableRowProps = {
  user: Students;
  onEdit: (user: Students) => void;
  onDelete: (id: number) => void;
};

const TeacherTableRow: React.FC<StudentsTableRowProps> = ({
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
      <Td>{user.classes?.name}</Td>
      <Td>
        <StudentTasks studentID={user.id}>
          <IconButton aria-label='Tasks' icon={<MdOutlineTaskAlt />} mr={2} />
        </StudentTasks>
      </Td>

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
