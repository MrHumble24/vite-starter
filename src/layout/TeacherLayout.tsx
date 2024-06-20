import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiExamBold, PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminSideBar from "../components/Sidebar";
import usePreferenceStore from "../states/usePreferenceStore";

const menuItems = [
  {
    label: "Classes",
    path: "/teacher/classes",
    icon: <SiGoogleclassroom />,
  },

  {
    label: "Students",
    path: "/teacher/students",
    icon: <PiStudentBold />,
  },
  {
    label: "Exams",
    path: "/teacher/exams",
    icon: <PiExamBold />,
  },
  {
    label: "Tasks",
    path: "/teacher/tasks",
    icon: <MdOutlineTaskAlt />,
  },
  {
    label: "Books",
    path: "/teacher/books",
    icon: <IoBookOutline />,
  },
  {
    label: "Statistics",
    path: "/teacher/stats",
    icon: <FaChartPie />,
  },
];

const TeacherLayout = () => {
  const pref = usePreferenceStore((s) => s.preferences);

  return (
    <Box>
      <Navbar />
      <Grid
        transition={"all 0.4s ease"}
        gap={2}
        gridTemplateColumns={`${pref.isSidebarOpen ? "200px" : "60px"} 1fr`}
      >
        <GridItem
          className='main-shadow'
          p={2}
          transition={"all 0.4s ease"}
          minH={"100vh"}
        >
          <AdminSideBar menuItems={menuItems} />
        </GridItem>
        <GridItem overflow={"scroll"} className='main-shadow' minH={"100vh"}>
          <Box>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TeacherLayout;
