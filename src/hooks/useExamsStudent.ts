// useExamsStudent.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { ExamsStudent } from "../types/types";

const fetchExamStudents = async () => {
  const { data, error } = await supabase
    .from("exam-student")
    .select("*, students(*), exams(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const useExamsStudent = () => {
  return useQuery<ExamsStudent[], Error>({
    queryFn: () => fetchExamStudents(),
    queryKey: ["exam-student"],
  });
};
