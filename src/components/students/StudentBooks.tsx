import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Students } from "../../types/types";

import { useBooksStudents } from "../../hooks/useBooksStudents";
import { BOOK_READ_STATUS } from "../../constants/constants";
import { supabase } from "../../api/supabase-client";

function StudentBooks({
  children,
  studentID,
  studentObject,
}: {
  children: React.ReactNode;
  studentID: number;
  studentObject: Students;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: books } = useBooksStudents();
  const qc = useQueryClient();
  const studentBooks = books?.filter((book) => book.studentID == studentID);

  const handleBookReadStatusChange = async (
    prop: string,
    value: string,
    id: number
  ) => {
    const { error } = await supabase
      .from("book-student")
      .update({ [prop]: value })
      .eq("id", id)
      .select();

    if (error) {
      console.log("error: ", error);
      return;
    }

    qc.invalidateQueries();
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Drawer size={"xxl"} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={"center"}>
            {studentObject.firstName + " " + studentObject.lastName}'s Books
          </DrawerHeader>

          <DrawerBody>
            <Box>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Students' Books</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Book Title</Th>
                      <Th>Read Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentBooks?.map((book) => (
                      <Tr key={book.id}>
                        <Td>{book?.books?.name}</Td>
                        <Td>
                          <Select
                            onChange={(e) =>
                              handleBookReadStatusChange(
                                "status",
                                e.target.value,
                                book.id
                              )
                            }
                            placeholder={book.status.toLocaleUpperCase()}
                            maxW={200}
                          >
                            {BOOK_READ_STATUS.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label.toLocaleUpperCase()}
                              </option>
                            ))}
                          </Select>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default StudentBooks;
