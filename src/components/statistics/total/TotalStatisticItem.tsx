import { Box, GridItem, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Total {
  quantity: number;
  icon: ReactNode;
  name: string;
}

const TotalStatisticItem = ({ quantity, icon, name }: Total) => {
  return (
    <GridItem>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={5}
        justifyContent={"center"}
        flexDirection={"column"}
        width={"100%"}
        minW={{ base: "200px", md: "150px", lg: "100%" }}
        rounded={"xl"}
        p={5}
        border={"1px solid"}
        borderColor='gray.200'
      >
        {icon}
        <Text>
          Total {quantity} {name}.
        </Text>
      </Box>
    </GridItem>
  );
};

export default TotalStatisticItem;
