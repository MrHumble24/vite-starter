// StudentProfile.tsx
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import { useGetStudent } from "../hooks/student page related hooks/useStudent";
import RegularMarksChart from "../components/statistics/RegularMarksChart";
import useTotal from "../hooks/useTotal";
import TaskStatusPieChart from "../components/statistics/TaskStatusPieChart";
import StudentExamStatistics from "../components/statistics/StudentExamStatistics";
import StudentBooks from "../components/students/StudentBooks";
import { Students } from "../types/types";
import StudentTasks from "../components/students/StudentTasks";
import StudentExams from "../components/students/StudentExams";

const StudentProfile: React.FC = () => {
  const gridColumns = useBreakpointValue({ base: "1fr", md: "1fr 4fr" });
  const { data: profileData, isLoading: isProfileLoading } = useGetStudent(26);
  const total = useTotal();
  const filteredExamStats =
    total.examStats?.filter((exam) => exam.studentID === profileData?.id) || [];
  const filteredTaskStats =
    total.taskStatus?.filter((task) => task.studentID === profileData?.id) ||
    [];

  if (isProfileLoading) {
    return (
      <Box
        minH={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box mx='auto' p={3}>
      <Navbar />
      <Grid gap={5} gridTemplateColumns={gridColumns}>
        <GridItem minH={"100vh"} p={3} boxShadow={"md"}>
          <Text fontWeight={"bold"} fontSize={"sm"}>
            Profile Info
          </Text>
          <Flex py={5} gap={3} alignItems={"center"}>
            <Avatar
              name={`${profileData?.firstName} ${profileData?.lastName}`}
              size='lg'
            />
            <Text fontSize='2xl' fontWeight='bold'>
              {profileData?.firstName} {profileData?.lastName}
            </Text>
          </Flex>
          <Divider my={5} />
          <Box mx={"auto"}>
            <Text
              cursor={"pointer"}
              boxShadow={"sm"}
              p={3}
              my={3}
              fontSize='lg'
            >
              <StudentBooks
                studentObject={profileData as Students}
                studentID={Number(profileData?.id)}
              >
                Books
              </StudentBooks>
            </Text>
            <Text
              cursor={"pointer"}
              boxShadow={"sm"}
              p={3}
              my={3}
              fontSize='lg'
            >
              <StudentTasks
                studentObject={profileData as Students}
                studentID={Number(profileData?.id)}
              >
                Tasks
              </StudentTasks>
            </Text>
            <Text
              cursor={"pointer"}
              boxShadow={"sm"}
              p={3}
              my={3}
              fontSize='lg'
            >
              <StudentExams
                studentObject={profileData as Students}
                studentID={Number(profileData?.id)}
              >
                Exams
              </StudentExams>
            </Text>
            <Text boxShadow={"sm"} p={3} my={3} fontSize='lg'>
              Class: {profileData?.classes?.name}
            </Text>
            <Text boxShadow={"sm"} p={3} my={3} fontSize='lg'>
              Phone: {profileData?.phone}
            </Text>
            <Text boxShadow={"sm"} p={3} my={3} fontSize='lg'>
              ID: {profileData?.id}
            </Text>
            <Text boxShadow={"sm"} p={3} my={3} fontSize='lg'>
              Failed attempts: {profileData?.failedAttempts}
            </Text>
          </Box>
        </GridItem>
        <GridItem boxShadow={"md"}>
          <Tabs>
            <TabList>
              <Tab>Progress Report</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Grid
                  gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                  gap={5}
                >
                  <GridItem>
                    <RegularMarksChart data={filteredExamStats} />
                  </GridItem>
                  <GridItem>
                    <TaskStatusPieChart data={filteredTaskStats || []} />
                  </GridItem>
                </Grid>
                <br />
                <StudentExamStatistics data={filteredExamStats || []} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentProfile;
