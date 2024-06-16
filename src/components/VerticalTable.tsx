/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

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
