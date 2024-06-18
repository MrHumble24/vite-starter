// useStudents.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Students } from "../types/types";

const fetchStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*, classes(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const useStudents = () => {
  return useQuery<Students[], Error>({
    queryFn: fetchStudents,
    queryKey: ["students"],
  });
};
