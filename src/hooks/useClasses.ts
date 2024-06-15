// useClasses.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Classes } from "../types/types";

const fetchClasses = async () => {
  const { data, error } = await supabase
    .from("classes")
    .select("*, teachers(*)");
  if (error) throw new Error(error.message);
  return data;
};

export const useClasses = () => {
  return useQuery<Classes[], Error>({
    queryFn: fetchClasses,
    queryKey: ["classes"],
  });
};
