import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Assignments } from "../../types/types";

interface TaskStatusPieChartProps {
  data: Assignments[];
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

  return (
    <Box
      p={3}
      borderRadius='md'
      borderWidth='1px'
      borderColor={"grey.200"}
      boxShadow='sm'
      h={"100%"}
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
