import { Box, Flex, Text } from "@chakra-ui/react";

export interface IPageBoxProps {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  create?: React.ReactNode;
}

const PageBox = ({ label, icon, content, create }: IPageBoxProps) => {
  return (
    <Box maxH={"95vh"} overflow={"scroll"}>
      <Flex
        alignItems={{ base: "start", md: "flex-start" }}
        gap={5}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        p={3}
      >
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          {icon}
          {label}
        </Text>
        {create}
      </Flex>

      <Box p={3}>{content}</Box>
    </Box>
  );
};

export default PageBox;
