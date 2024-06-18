// useBooksStudents.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../api/supabase-client";
import { BooksStudent } from "../types/types";

const fetchBooks = async () => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return data;
};

export const useBooks = () => {
  return useQuery<BooksStudent[], Error>({
    queryFn: fetchBooks,
    queryKey: ["books"],
  });
};
