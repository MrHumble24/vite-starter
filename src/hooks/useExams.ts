// useExams.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Exams } from "../types/types";

const fetchExams = async () => {
  const { data, error } = await supabase
    .from("exams")
    .select("*, classes(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const useExams = () => {
  return useQuery<Exams[], Error>({
    queryFn: fetchExams,
    queryKey: ["exams"],
  });
};
