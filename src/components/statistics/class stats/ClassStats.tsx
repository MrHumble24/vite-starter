import { useParams } from "react-router-dom";
import useTotal from "../../../hooks/useTotal";
import { Box } from "@chakra-ui/react";
import TotalStat from "../total/TotalStat";
import { useEffect, useState } from "react";

const ClassStats = () => {
  const params = useParams();
  const { examStats, taskStatus, total } = useTotal();
  console.log(examStats, taskStatus);
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
  console.log(data);
  return (
    <Box>
      ClassStats {params?.classID}
      <TotalStat total={data} />
    </Box>
  );
};

export default ClassStats;
