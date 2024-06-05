import { Box, Flex, List, ListItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import usePreferenceStore from "../states/usePreferenceStore";

type MenuItemType = {
  label: string;
  path: string;
  icon: ReactNode;
};

const AdminSideBar = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  const { pathname } = useLocation();
  const pref = usePreferenceStore((s) => s.preferences);

  return (
    <Box as='aside' className='shadow' minH={"100vh"}>
      <List spacing={1}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <ListItem
              className={pathname === item.path ? "sidebar-active" : ""}
              p={2}
            >
              <Flex gap={3} fontSize={12} alignItems={"center"}>
                {item.icon}
                {pref.isSidebarOpen && item.label}
              </Flex>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );
};

export default AdminSideBar;
