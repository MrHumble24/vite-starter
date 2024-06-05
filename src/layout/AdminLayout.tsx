import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import usePreferenceStore from "../states/usePreferenceStore";
import AdminSideBar from "../components/Sidebar";
import { FaUserGroup } from "react-icons/fa6";
import { GrHomeOption } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiChalkboardTeacherFill, PiStudentBold } from "react-icons/pi";
const menuItems = [
  {
    label: "Teachers",
    path: "/admin/teachers",
    icon: <PiChalkboardTeacherFill />,
  },
  {
    label: "Rooms",
    path: "/admin/rooms",
    icon: <GrHomeOption />,
  },
  {
    label: "Groups",
    path: "/admin/groups",
    icon: <FaUserGroup />,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: <PiStudentBold />,
  },
  {
    label: "Leads",
    path: "/admin/leads",
    icon: <MdOutlinePendingActions />,
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
          <Box>Main</Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
