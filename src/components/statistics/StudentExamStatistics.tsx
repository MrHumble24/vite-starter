import {
  Box,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExamRecord {
  id: number;
  created_at: string;
  studentID: number;
  examID: number;
  status: boolean; // Assuming status is a string that can be 'passed' or 'failed'
  regularMark: number;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

interface StudentExamStatisticsProps {
  data: ExamRecord[];
}

const StudentExamStatistics: React.FC<StudentExamStatisticsProps> = ({
  data,
}) => {
  // Calculate average marks for each skill
  const totalMarks = { listening: 0, reading: 0, writing: 0, speaking: 0 };
  const count = data?.length;
  const breakpoints = useBreakpointValue({ base: "1fr", md: "1fr 2fr" });
  data?.forEach((record) => {
    totalMarks.listening += record.listening;
    totalMarks.reading += record.reading;
    totalMarks.writing += record.writing;
    totalMarks.speaking += record.speaking;
  });

  const averageMarks = {
    listening: (totalMarks.listening / count).toFixed(1),
    reading: (totalMarks.reading / count).toFixed(1),
    writing: (totalMarks.writing / count).toFixed(1),
    speaking: (totalMarks.speaking / count).toFixed(1),
  };

  const barChartData = [
    { name: "Listening", value: averageMarks.listening },
    { name: "Reading", value: averageMarks.reading },
    { name: "Writing", value: averageMarks.writing },
    { name: "Speaking", value: averageMarks.speaking },
  ];

  // Calculate pass/fail ratio
  const passCount = data?.filter((record) => record.status == true).length;
  const failCount = count - passCount;

  const pieChartData = [
    { name: "Passed", value: passCount },
    { name: "Failed", value: failCount },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius='md'
      borderWidth='1px'
      borderColor={borderColor}
      boxShadow='md'
    >
      <Heading as='h3' size='lg' mb={4} textAlign='center'>
        Student Exam Statistics
      </Heading>
      <Grid gap={5} gridTemplateColumns={breakpoints}>
        <GridItem borderRight={"1px solid black"}>
          <Box>
            <Heading as='h4' size='md' mb={4} textAlign='center'>
              Pass/Fail Ratio
            </Heading>
            <ResponsiveContainer width='100%' height={400}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={150}
                  fill='#8884d8'
                  label
                >
                  {pieChartData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Heading as='h4' size='md' mb={4} textAlign='center'>
              Average Marks by Skill
            </Heading>
            <ResponsiveContainer width='100%' height={400}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='value' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StudentExamStatistics;
