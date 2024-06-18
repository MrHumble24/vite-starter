// useAssignments.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Assignments } from "../types/types";

const fetchAssignments = async () => {
  const { data, error } = await supabase
    .from("assignments")
    .select("*, students(*), tasks(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const useAssignments = () => {
  return useQuery<Assignments[], Error>({
    queryFn: fetchAssignments,
    queryKey: ["assignments"],
  });
};
