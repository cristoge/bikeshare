import { supabase } from "./supabase"

export const createRoute = async (rentid: string, startLocation_id: string) => {
  const { data, error } = await supabase
    .from('route')
    .insert([{ rent_id: rentid, startLocation_id:startLocation_id }]);

  if (error) {
    throw new Error(`Error creating route: ${error.message}`);
  }
  return data;
};

export const FinalLocation = async (rentid: string, endLocation_id: string) => {
  const { data, error } = await supabase
    .from('route')
    .update({ endLocation_id:endLocation_id })
    .eq('rentid', rentid);
  if (error) {
    throw new Error(`Error updating final location: ${error.message}`);
  }

  return data;
};