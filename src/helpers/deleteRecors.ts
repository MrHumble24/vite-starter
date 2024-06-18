import { supabase } from "../api/supabase-client";

interface IDeleteRecord {
  id: number;
  table: string;
}

export const deleteRecord = async ({ table, id }: IDeleteRecord) => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    throw error;
  }
};
