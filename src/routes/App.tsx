import {
  PiChalkboardTeacherFill,
  PiExamBold,
  PiStudentBold,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBox from "../components/PageBox";
import ClassesTable from "../components/classes/ClassesTable";
import ExamsTable from "../components/exams/ExamsTable";
import StudentsTable from "../components/students/StudentTable";
import TeacherTable from "../components/teacher/TeacherTable";
import { useClasses } from "../hooks/useClasses";
import { useExams } from "../hooks/useExams";
import { useStudents } from "../hooks/useStudents";
import { useTeachers } from "../hooks/useTeachers";
import AdminLayout from "../layout/AdminLayout";
import CreateTeacher from "../components/teacher/CreateTeacher";
import CreateClasses from "../components/classes/CreateClasses";
import CreateStudent from "../components/students/CreateStudent";
import CreateExam from "../components/exams/CreateExam";

function App() {
  const { data: teachers } = useTeachers();
  const { data: classes } = useClasses();
  const { data: exams } = useExams();
  const { data: students } = useStudents();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
