import {
  PiChalkboardTeacherFill,
  PiExamBold,
  PiStudentBold,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBox from "../components/PageBox";
import ClassesTable from "../components/classes/ClassesTable";
import CreateClasses from "../components/classes/CreateClasses";
import CreateExam from "../components/exams/CreateExam";
import ExamsTable from "../components/exams/ExamsTable";
import CreateStudent from "../components/students/CreateStudent";
import StudentsTable from "../components/students/StudentTable";
import TasksTable from "../components/tasks/TasksTable";
import CreateTeacher from "../components/teacher/CreateTeacher";
import TeacherTable from "../components/teacher/TeacherTable";
import { useClasses } from "../hooks/useClasses";
import { useExams } from "../hooks/useExams";
import { useStudents } from "../hooks/useStudents";
import { useTeachers } from "../hooks/useTeachers";
import AdminLayout from "../layout/AdminLayout";
import { useTasks } from "../hooks/useTasks";
import CreateTask from "../components/tasks/CreateTask";
import BooksTable from "../components/books/BooksTable";
import CreateBooks from "../components/books/CreateBooks";
import { useBooks } from "../hooks/useBooks";
import { IoBookOutline } from "react-icons/io5";

function App() {
  const { data: teachers } = useTeachers();
  const { data: classes } = useClasses();
  const { data: exams } = useExams();
  const { data: students } = useStudents();
  const { data: tasks } = useTasks();
  const { data: books } = useBooks();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route
            path='/admin/books'
            element={
              <PageBox
                create={<CreateBooks />}
                content={
                  <BooksTable
                    // onDelete={() => {}}
                    onEdit={() => {}}
                    books={books}
                  />
                }
                icon={<IoBookOutline />}
                label='Books Page'
              />
            }
          />
          <Route
            path='/admin/exams'
            element={
              <PageBox
                create={<CreateExam />}
                content={
                  <ExamsTable
                    // onDelete={() => {}}
                    onEdit={() => {}}
                    exams={exams}
                  />
                }
                icon={<PiExamBold />}
                label='Exams Page'
              />
            }
          />
          <Route
            path='/admin/teachers'
            element={
              <PageBox
                create={<CreateTeacher />}
                content={
                  <TeacherTable
                    onDelete={() => {}}
                    onEdit={() => {}}
                    users={teachers}
                  />
                }
                icon={<PiChalkboardTeacherFill />}
                label='Teachers Page'
              />
            }
          />
          <Route
            path='/admin/classes'
            element={
              <PageBox
                create={<CreateClasses />}
                content={<ClassesTable onEdit={() => {}} classes={classes} />}
                icon={<SiGoogleclassroom />}
                label='Classes Page'
              />
            }
          />
          <Route
            path='/admin/students'
            element={
              <PageBox
                create={<CreateStudent />}
                content={
                  <StudentsTable
                    onDelete={() => {}}
                    onEdit={() => {}}
                    students={students}
                  />
                }
                icon={<PiStudentBold />}
                label='Students Page'
              />
            }
          />
          <Route
            path='/admin/tasks'
            element={
              <PageBox
                create={<CreateTask />}
                content={<TasksTable onEdit={() => {}} tasks={tasks} />}
                icon={<PiStudentBold />}
                label='Tasks Page'
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
