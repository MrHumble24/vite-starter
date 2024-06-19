/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiNotePencilFill, PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import StudentExamStatistics from "../StudentExamStatistics";
import TaskStatusPieChart from "../TaskStatusPieChart";
import TotalStatisticItem from "./TotalStatisticItem";
export interface Total {
  books: number;
  students: number;
  teachers: number;
  classes: number;
  exams: number;
}

const TotalStat = ({ total }: any) => {
  console.log(total.total.books);
  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(auto-fit, minmax(180px, 1fr))",
    md: "repeat(auto-fit, minmax(200px, 1fr))",
    lg: "repeat(auto-fit, minmax(200px, 1fr))",
  });
  const gridTemplateColumnsBig = useBreakpointValue({
    base: "repeat(auto-fit, minmax(350px, 1fr))",
    md: "repeat(auto-fit, minmax(200px, 1fr))",
    lg: "repeat(auto-fit, minmax(250px, 1fr))",
    xl: "2fr 3fr",
  });
  const iconSize = useBreakpointValue({ base: 30, md: 50 });

  return (
    <Grid gap={5}>
      <Grid
        alignSelf={"center"}
        gap={5}
        gridTemplateColumns={gridTemplateColumns}
      >
        <TotalStatisticItem
          name={total.total.books > 1 ? "Books" : "Book"}
          quantity={total.total.books}
          icon={<IoBookOutline size={iconSize} />}
        />
        <TotalStatisticItem
          name={total.total.exams > 1 ? "Exams" : "Exam"}
          quantity={total.total.exams}
          icon={<PiNotePencilFill size={iconSize} />}
        />
        <TotalStatisticItem
          name={total.total.students > 1 ? "Students" : "Student"}
          quantity={total.total.students}
          icon={<PiStudentBold size={iconSize} />}
        />
        <TotalStatisticItem
          name={total.total.teachers > 1 ? "Teachers" : "Teacher"}
          quantity={total.total.teachers}
          icon={<FaChalkboardTeacher size={iconSize} />}
        />
        <TotalStatisticItem
          name={total.total.classes > 1 ? "Classes" : "Class"}
          quantity={total.total.classes}
          icon={<SiGoogleclassroom size={iconSize} />}
        />
        <TotalStatisticItem
          name={total.total.classes > 1 ? "Tasks" : "Task"}
          quantity={total.total.tasks}
          icon={<MdOutlineTaskAlt size={iconSize} />}
        />
      </Grid>
      <StudentExamStatistics data={total.examStats} />
      <TaskStatusPieChart data={total.taskStatus} />

      <Grid gap={2} gridTemplateColumns={gridTemplateColumnsBig}></Grid>
    </Grid>
  );
};

export default TotalStat;
