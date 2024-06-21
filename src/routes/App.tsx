import { FaChartPie } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import {
  PiChalkboardTeacherFill,
  PiExamBold,
  PiStudentBold,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import PageBox from "../components/PageBox";
import BooksTable from "../components/books/BooksTable";
import CreateBooks from "../components/books/CreateBooks";
import ClassesTable from "../components/classes/ClassesTable";
import CreateClasses from "../components/classes/CreateClasses";
import CreateExam from "../components/exams/CreateExam";
import ExamsTable from "../components/exams/ExamsTable";
import TableSkeleton from "../components/skeletons/TableSkeleton";
import TotalStat from "../components/statistics/total/TotalStat";
import CreateStudent from "../components/students/CreateStudent";
import StudentsTable from "../components/students/StudentTable";
import CreateTask from "../components/tasks/CreateTask";
import TasksTable from "../components/tasks/TasksTable";
import CreateTeacher from "../components/teacher/CreateTeacher";
import TeacherTable from "../components/teacher/TeacherTable";
import useUserStore from "../hooks/login/useUserLogin";
import { useBooksStudents } from "../hooks/useBooksStudents";
import { useClasses } from "../hooks/useClasses";
import { useExams } from "../hooks/useExams";
import { useStudents } from "../hooks/useStudents";
import { useTasks } from "../hooks/useTasks";
import { useTeachers } from "../hooks/useTeachers";
import useTotal from "../hooks/useTotal";
import AdminLayout from "../layout/AdminLayout";
import LoginLayout from "../layout/LoginLayout";
import StudentProfile from "../layout/StudentLayout";
import ClassStats from "../components/statistics/class stats/ClassStats";
import { MdOutlineQueryStats } from "react-icons/md";
function App() {
  const { data: teachers, isLoading: teachersLoading } = useTeachers();
  const { data: classes, isLoading: classesLoading } = useClasses();
  const { data: exams, isLoading: examsLoading } = useExams();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: books, isLoading: booksLoading } = useBooksStudents();
  const total = useTotal();

  const user = useUserStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginLayout />} />
        <Route path='/login/:user' element={<LoginForm />} />
        <Route
          path='/admin'
          element={
            user?.role == "ADMIN" ? (
              <AdminLayout />
            ) : (
              <Navigate replace to='/' />
            )
          }
        >
          <Route
            path='/admin/books'
            element={
              <PageBox
                create={<CreateBooks />}
                content={
                  booksLoading ? (
                    <TableSkeleton />
                  ) : (
                    <BooksTable onEdit={() => {}} books={books} />
                  )
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
                  examsLoading ? (
                    <TableSkeleton />
                  ) : (
                    <ExamsTable onEdit={() => {}} exams={exams} />
                  )
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
                  teachersLoading ? (
                    <TableSkeleton />
                  ) : (
                    <TeacherTable
                      onDelete={() => {}}
                      onEdit={() => {}}
                      users={teachers}
                    />
                  )
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
                content={
                  classesLoading ? (
                    <TableSkeleton />
                  ) : (
                    <ClassesTable onEdit={() => {}} classes={classes} />
                  )
                }
                icon={<SiGoogleclassroom />}
                label='Classes Page'
              />
            }
          />
          <Route
            path='/admin/classes/stats/:classID'
            element={
              <PageBox
                create={<CreateClasses />}
                content={<ClassStats />}
                icon={<MdOutlineQueryStats />}
                label='Statistics'
              />
            }
          />
          <Route
            path='/admin/students'
            element={
              <PageBox
                create={<CreateStudent />}
                content={
                  studentsLoading ? (
                    <TableSkeleton />
                  ) : (
                    <StudentsTable
                      onDelete={() => {}}
                      onEdit={() => {}}
                      students={students}
                    />
                  )
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
                content={
                  tasksLoading ? (
                    <TableSkeleton />
                  ) : (
                    <TasksTable onEdit={() => {}} tasks={tasks} />
                  )
                }
                icon={<PiStudentBold />}
                label='Tasks Page'
              />
            }
          />

          <Route
            path='/admin/stats'
            element={
              <PageBox
                content={
                  tasksLoading ? <TableSkeleton /> : <TotalStat total={total} />
                }
                icon={<FaChartPie />}
                label='Stats Page'
              />
            }
          />
        </Route>

        <Route
          path='/student/page'
          element={
            user?.role == "STUDENT" ? (
              <StudentProfile />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
