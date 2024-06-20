// RegularMarksChart.tsx
import { Box } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  created_at: string;
  regularMark: number;
}

interface Props {
  data: DataPoint[];
}

const RegularMarksChart: React.FC<Props> = ({ data }) => {
  const labels = data?.map((point) =>
    moment(point.created_at).format("MM/DD/YY h:mm")
  );
  const regularMarks = data?.map((point) => point.regularMark);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Regular Marks",
        data: regularMarks,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <Box
      borderRadius='md'
      borderWidth='1px'
      borderColor={"grey.200"}
      p={2}
      width='100%'
      mx='auto'
      maxWidth='800px'
      minH={"500px"}
    >
      <Box my={"auto"}>
        <Line data={chartData} />
      </Box>
    </Box>
  );
};

export default RegularMarksChart;
