// useMarks.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Marks } from "../types/types";

const fetchMarks = async () => {
  const { data, error } = await supabase
    .from("marks")
    .select("*, students(*), exams(*)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const useMarks = () => {
  return useQuery<Marks[], Error>({
    queryFn: fetchMarks,
    queryKey: ["marks"],
  });
};
