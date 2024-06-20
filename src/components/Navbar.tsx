import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import usePreferenceStore from "../states/usePreferenceStore";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "./Logo";
import useUserStore from "../hooks/login/useUserLogin";
const Navbar = () => {
  const setPref = usePreferenceStore((s) => s.setPreferences);
  const pref = usePreferenceStore((s) => s.preferences);
  const user = useUserStore((s) => s.user);
  const removeUser = useUserStore((s) => s.removeUser);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex mb={2} className='main-shadow' justifyContent={"space-between"} p={2}>
      <Flex alignItems={"center"} gap={3}>
        <Button
          rounded={"full"}
          variant={"outline"}
          onClick={() => {
            setPref({ isSidebarOpen: !pref?.isSidebarOpen });
          }}
        >
          {pref?.isSidebarOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </Button>
        <Logo />
      </Flex>
      <Flex gap={3}>
        {user && (
          <Button
            rounded={"full"}
            size={{ base: "sm", md: "md" }}
            variant='outline'
            rightIcon={<IoLogOutOutline />}
            onClick={removeUser}
          >
            Log out
          </Button>
        )}
        <Button
          rounded={"full"}
          size={{ base: "sm", md: "md" }}
          variant='outline'
          onClick={toggleColorMode}
        >
          {colorMode == "dark" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
