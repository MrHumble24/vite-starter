import {
  Box,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Task {
  id: number;
  isSubmitted: number;
  isChecked: number;
}

interface TaskStatusPieChartProps {
  data: Task[];
}

const TaskStatusPieChart: React.FC<TaskStatusPieChartProps> = ({ data }) => {
  const radius = useBreakpointValue({ base: 80, md: 150 });

  const submittedAndChecked = data?.filter(
    (task) => task.isSubmitted && task.isChecked
  ).length;
  const submittedNotChecked = data?.filter(
    (task) => task.isSubmitted && !task.isChecked
  ).length;
  const notSubmittedAndChecked = data?.filter(
    (task) => !task.isSubmitted && task.isChecked
  ).length;
  const notSubmittedNotChecked = data?.filter(
    (task) => !task.isSubmitted && !task.isChecked
  ).length;

  const chartData = [
    { name: "Submitted and Checked", value: submittedAndChecked },
    { name: "Submitted but Not Checked", value: submittedNotChecked },
    { name: "Not Submitted but Checked", value: notSubmittedAndChecked },
    { name: "Not Submitted and Not Checked", value: notSubmittedNotChecked },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={bgColor}
      p={3}
      borderRadius='md'
      borderWidth='1px'
      borderColor={borderColor}
      boxShadow='md'
    >
      <Heading as='h3' size='lg' mb={4} textAlign='center'>
        Task Status Overview
      </Heading>
      <ResponsiveContainer width='100%' height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={radius}
            fill='#8884d8'
            label
          >
            {chartData.map((_entry, index) => (
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
  );
};

export default TaskStatusPieChart;
