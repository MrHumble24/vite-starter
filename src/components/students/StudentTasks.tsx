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
import { Assignments, Students } from "../../types/types";
import { useQueryClient } from "@tanstack/react-query";

import { ChangeEvent } from "react";

function StudentTasks({
  children,
  studentID,
  studentObject,
}: {
  children: React.ReactNode;
  studentID: number;
  studentObject: Students;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useAssignments();
  const qc = useQueryClient();
  const studentAssignments = data?.filter(
    (assignment) => assignment.studentID === studentID
  );

  const handleChecked = async (
    assignment: Assignments,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    console.log(assignment);

    console.log(event.target.checked);
    const { error } = await supabase
      .from("assignments")
      .update({ isChecked: event.target.checked })
      .eq("id", assignment.id)
      .select();

    if (error) {
      console.log(error.message);
      return;
    }

    qc.invalidateQueries();
  };
  const handleSubmitted = async (
    assignment: Assignments,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    console.log(assignment);

    console.log(event.target.checked);
    const { error } = await supabase
      .from("assignments")
      .update({ isSubmitted: event.target.checked })
      .eq("id", assignment.id)
      .select();

    if (error) {
      console.log(error.message);
      return;
    }

    qc.invalidateQueries();
  };
  console.log(studentAssignments);
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Drawer size={"xxl"} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={"center"}>
            {studentObject.firstName + " " + studentObject.lastName}'s Tasks
          </DrawerHeader>

          <DrawerBody>
            <Box>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Students Assignments</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Task Title</Th>
                      <Th>Deadline</Th>
                      <Th>Submitted Time</Th>
                      <Th>Checked</Th>
                      <Th>Submitted</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentAssignments?.map((assignment) => (
                      <Tr key={assignment.id}>
                        <Td>{assignment?.tasks?.name}</Td>
                        <Td>
                          {moment(assignment?.submittedTime).format(
                            "MM/DD/YY h:mm"
                          )}
                        </Td>
                        <Td>
                          {moment(assignment?.tasks?.deadline).format(
                            "MM/DD/YY h:mm"
                          )}
                        </Td>
                        <Td>
                          <Checkbox
                            onChange={(event) =>
                              handleChecked(assignment, event)
                            }
                            isChecked={Boolean(assignment.isChecked)}
                          ></Checkbox>
                        </Td>
                        <Td>
                          {" "}
                          <Checkbox
                            onChange={(event) =>
                              handleSubmitted(assignment, event)
                            }
                            isChecked={Boolean(assignment.isSubmitted)}
                          ></Checkbox>
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

export default StudentTasks;
