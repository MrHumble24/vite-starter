// useTeachers.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Teacher } from "../types/types";

const fetchTeachers = async () => {
  const { data, error } = await supabase
    .from("teachers")
    .select("*, classes(*)");
  if (error) throw new Error(error.message);
  return data;
};

export const useTeachers = () => {
  return useQuery<Teacher[], Error>({
    queryFn: fetchTeachers,
    queryKey: ["teachers"],
  });
};
