// useTasks.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { Tasks } from "../types/types";

const fetchTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*, classes(*)");
  if (error) throw new Error(error.message);
  return data;
};

export const useTasks = () => {
  return useQuery<Tasks[], Error>({
    queryFn: fetchTasks,
    queryKey: ["tasks"],
  });
};
