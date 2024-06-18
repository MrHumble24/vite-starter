// TeacherTableRow.tsx
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoBookOutline, IoFolderOpenOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Students } from "../../types/types";
import StudentBooks from "./StudentBooks";
import StudentExams from "./StudentExams";
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Tr>
      <Td>{user.firstName}</Td>
      <Td>{user.lastName}</Td>
      <Td>{user.username}</Td>
      <Td cursor={"help"} onClick={() => setPasswordVisible(!passwordVisible)}>
        {passwordVisible ? user.password : "*********"}
      </Td>
      <Td>{user.classes?.name}</Td>
      <Td>
        <StudentTasks studentID={user.id} studentObject={user}>
          <IconButton aria-label='Tasks' icon={<MdOutlineTaskAlt />} mr={2} />
        </StudentTasks>
      </Td>
      <Td>
        <StudentExams studentID={user.id} studentObject={user}>
          <IconButton
            aria-label='Exams'
            icon={<IoFolderOpenOutline />}
            mr={2}
          />
        </StudentExams>
      </Td>
      <Td>
        <StudentBooks studentID={user.id} studentObject={user}>
          <IconButton aria-label='Exams' icon={<IoBookOutline />} mr={2} />
        </StudentBooks>
      </Td>

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
          onClick={() => onDelete(user.id)}
        />
      </Td>
    </Tr>
  );
};

export default TeacherTableRow;
