import { useLocation, useParams } from "react-router-dom";
import useTotal from "../../../hooks/useTotal";
import { Box, Text } from "@chakra-ui/react";
import TotalStat from "../total/TotalStat";
import { useEffect, useState } from "react";

const ClassStats = () => {
  const params = useParams();
  const { examStats, taskStatus, total } = useTotal();

  const filteredExamsStatus = examStats?.filter(
    (e) => e.students?.class == params.classID
  );
  const filteredTaskStatus = taskStatus?.filter(
    (e) => e.students?.class == params.classID
  );
  const [data, setData] = useState({
    total,
    examStats: filteredExamsStatus,
    taskStatus: filteredTaskStatus,
  });

  useEffect(() => {
    setData({
      total,
      examStats: filteredExamsStatus,
      taskStatus: filteredTaskStatus,
    });
  }, []);

  const classData = useLocation().state;
  console.log({ classData });
  return (
    <Box>
      <Text my={4} fontWeight={"bold"}>
        Stats for {classData?.class?.name} class [{" "}
        {classData?.class?.teachers?.firstName}{" "}
        {classData?.class?.teachers?.lastName}]
      </Text>
      <TotalStat total={data} />
    </Box>
  );
};

export default ClassStats;
