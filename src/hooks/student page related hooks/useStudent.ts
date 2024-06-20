// useGetStudent.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../api/supabase-client";
import { Students } from "../../types/types";

const fetchOneStudent = async (id: number) => {
  const { data, error } = await supabase
    .from("students")
    .select("*, classes(*)")
    .eq("id", id)
    .order("created_at", { ascending: false })
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useGetStudent = (id: number) => {
  return useQuery<Students, Error>({
    queryFn: () => fetchOneStudent(id),
    queryKey: ["student-profile"],
  });
};
