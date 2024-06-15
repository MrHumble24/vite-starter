/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

type DataItem = {
  [key: string]: any;
};

type VerticalTableProps = {
  headers: string[];
  data: DataItem[];
};

const VerticalTable: React.FC<VerticalTableProps> = ({ headers, data }) => {
  return (
    <TableContainer overflow={"scroll"}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>
                <Box>{header}</Box>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <Td key={colIndex}>{item[header]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VerticalTable;
