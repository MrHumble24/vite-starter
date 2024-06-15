import { Box, Grid, GridItem } from "@chakra-ui/react";
import {
  PiChalkboardTeacherFill,
  PiExamBold,
  PiStudentBold,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import Navbar from "../components/Navbar";
import AdminSideBar from "../components/Sidebar";
import usePreferenceStore from "../states/usePreferenceStore";
import { Outlet } from "react-router-dom";
const menuItems = [
  {
    label: "Teachers",
    path: "/admin/teachers",
    icon: <PiChalkboardTeacherFill />,
  },
  {
    label: "Classes",
    path: "/admin/classes",
    icon: <SiGoogleclassroom />,
  },

  {
    label: "Students",
    path: "/admin/students",
    icon: <PiStudentBold />,
  },
  {
    label: "Exams",
    path: "/admin/exams",
    icon: <PiExamBold />,
  },
];

const AdminLayout = () => {
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
        <GridItem className='main-shadow' minH={"100vh"}>
          <Box>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
