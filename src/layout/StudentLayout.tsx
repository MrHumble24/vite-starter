// StudentProfile.tsx
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import RegularMarksChart from "../components/statistics/RegularMarksChart";
import StudentExamStatistics from "../components/statistics/StudentExamStatistics";
import TaskStatusPieChart from "../components/statistics/TaskStatusPieChart";
import StudentBooks from "../components/students/StudentBooks";
import StudentExams from "../components/students/StudentExams";
import StudentTasks from "../components/students/StudentTasks";
import { useGetStudent } from "../hooks/student page related hooks/useStudent";
import useTotal from "../hooks/useTotal";
import { Students } from "../types/types";
const StudentProfile: React.FC = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
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
        <GridItem minH={{ base: "", md: "100vh" }} p={3} boxShadow={"md"}>
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
          <Button
            onClick={() => setProfileVisible(!isProfileVisible)}
            variant={"ghost"}
            size={"xs"}
            rightIcon={isProfileVisible ? <FaAngleUp /> : <FaAngleDown />}
          >
            See Profile info
          </Button>
          {isProfileVisible && <Divider my={5} />}

          {isProfileVisible && (
            <Box mx={"auto"}>
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
          )}
        </GridItem>
        <GridItem display={{ base: "none", md: "block" }}>
          <Box>
            <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
              <GridItem>
                <RegularMarksChart data={filteredExamStats} />
              </GridItem>
              <GridItem>
                <TaskStatusPieChart data={filteredTaskStats || []} />
              </GridItem>
            </Grid>
            <br />
            <StudentExamStatistics data={filteredExamStats || []} />
          </Box>
        </GridItem>
        <GridItem display={{ base: "block", md: "none" }}>
          <Flex justifyContent={"space-evenly"} gap={3}>
            <StudentBooks
              studentObject={profileData as Students}
              studentID={Number(profileData?.id)}
            >
              <Button variant={"outline"} colorScheme='red' rounded={"full"}>
                Books
              </Button>
            </StudentBooks>
            <StudentTasks
              studentObject={profileData as Students}
              studentID={Number(profileData?.id)}
            >
              <Button variant={"outline"} colorScheme='blue' rounded={"full"}>
                Tasks
              </Button>
            </StudentTasks>
            <StudentExams
              studentObject={profileData as Students}
              studentID={Number(profileData?.id)}
            >
              <Button variant={"outline"} colorScheme='black' rounded={"full"}>
                Exams
              </Button>
            </StudentExams>
          </Flex>
        </GridItem>
      </Grid>
      <br />
      <Box display={{ base: "block", md: "none" }}>
        <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
          <GridItem>
            <RegularMarksChart data={filteredExamStats} />
          </GridItem>
          <GridItem>
            <TaskStatusPieChart data={filteredTaskStats || []} />
          </GridItem>
        </Grid>
        <br />
        <StudentExamStatistics data={filteredExamStats || []} />
      </Box>
    </Box>
  );
};

export default StudentProfile;
