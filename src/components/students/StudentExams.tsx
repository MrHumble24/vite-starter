import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
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
import moment from "moment";
import { useAssignments } from "../../hooks/useAssignments";
import { supabase } from "../../api/supabase-client";
import { Assignments, Exams, Students } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";

import { ChangeEvent, FocusEvent } from "react";
import { useExamsStudent } from "../../hooks/useExamsStudent";

function StudentExams({
  children,
  studentID,
  studentObject,
}: {
  children: React.ReactNode;
  studentID: number;
  studentObject: Students;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const qc = useQueryClient();
  const { data: stex } = useExamsStudent();
  console.log({ stex });

  const filtered = stex?.filter((e) => e.studentID == studentID);

  const handleAssessmentChange = async (
    event: FocusEvent<HTMLInputElement, Element>,
    exam: Exams,
    type: string
  ) => {
    console.log("first");
    try {
      const { data, error } = await supabase
        .from("exam-student")
        .update({
          [type]: Number(event.target.value),
        })
        .eq("id", exam.id)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      qc.invalidateQueries();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Drawer size={"xxl"} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={"center"}>
            {studentObject.firstName + " " + studentObject.lastName}'s Exams
          </DrawerHeader>

          <DrawerBody>
            <Box>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Students Exams</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Exam</Th>
                      <Th>Scheduled</Th>
                      <Th textAlign={"center"}>
                        Regular <br />
                        (non IELTS)
                      </Th>
                      <Th>Listening</Th>
                      <Th>Reading</Th>
                      <Th>Writing</Th>
                      <Th>Speaking</Th>
                      <Th>Overall</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filtered?.map((e) => {
                      const overall =
                        e.listening + e.reading + e.writing + e.speaking != 0
                          ? Math.round(
                              (e.listening +
                                e.reading +
                                e.writing +
                                e.speaking) /
                                4
                            )
                          : e.listening + e.reading + e.writing + e.speaking;
                      return (
                        <Tr key={e.id}>
                          <Td>{e.exams?.name}</Td>
                          <Td>
                            {moment(e?.scheduled).format("MM/DD/YY h:mm")}
                          </Td>

                          <Td>
                            <Input
                              textAlign={"center"}
                              onBlur={(event) =>
                                handleAssessmentChange(event, e, "regularMark")
                              }
                              defaultValue={e.regularMark}
                              type='number'
                              htmlSize={4}
                            />
                          </Td>
                          <Td>
                            <Input
                              textAlign={"center"}
                              defaultValue={e.listening}
                              type='number'
                              htmlSize={4}
                              onBlur={(event) =>
                                handleAssessmentChange(event, e, "listening")
                              }
                            />{" "}
                          </Td>
                          <Td>
                            <Input
                              textAlign={"center"}
                              defaultValue={e.reading}
                              onBlur={(event) =>
                                handleAssessmentChange(event, e, "reading")
                              }
                              type='number'
                              htmlSize={4}
                            />{" "}
                          </Td>
                          <Td>
                            <Input
                              textAlign={"center"}
                              defaultValue={e.writing}
                              type='number'
                              onBlur={(event) =>
                                handleAssessmentChange(event, e, "writing")
                              }
                              htmlSize={4}
                            />{" "}
                          </Td>
                          <Td>
                            <Input
                              textAlign={"center"}
                              defaultValue={e.speaking}
                              type='number'
                              onBlur={(event) =>
                                handleAssessmentChange(event, e, "speaking")
                              }
                              htmlSize={4}
                            />{" "}
                          </Td>
                          <Td>
                            <Input
                              textAlign={"center"}
                              disabled
                              defaultValue={overall}
                              type='number'
                              htmlSize={4}
                            />{" "}
                          </Td>
                        </Tr>
                      );
                    })}
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

export default StudentExams;
