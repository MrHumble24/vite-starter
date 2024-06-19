import { useAssignments } from "./useAssignments";
import { useBooks } from "./useBooks";
import { useClasses } from "./useClasses";
import { useExams } from "./useExams";
import { useExamsStudent } from "./useExamsStudent";
import { useStudents } from "./useStudents";
import { useTasks } from "./useTasks";
import { useTeachers } from "./useTeachers";

// interface for total
export interface Total {
  books: number;
  students: number;
  teachers: number;
  classes: number;
  exams: number;
  tasks: number;
}

const useTotal = () => {
  const { data: books } = useBooks();
  const { data: students } = useStudents();
  const { data: teachers } = useTeachers();
  const { data: classes } = useClasses();
  const { data: exams } = useExams();
  const { data: tasksLength } = useTasks();
  const { data: tasks } = useAssignments();
  const { data: examStats } = useExamsStudent();

  const total: Total = {
    books: books?.length || 0,
    students: students?.length || 0,
    teachers: teachers?.length || 0,
    classes: classes?.length || 0,
    exams: exams?.length || 0,
    tasks: tasksLength?.length || 0,
  };

  return {
    total,
    taskStatus: tasks,
    examStats,
  };
};

export default useTotal;
