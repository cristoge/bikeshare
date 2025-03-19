import { generateTimestampz } from "../utils/generateTimestampz";
import { supabase } from "./supabase";

const createRent = async (user:string,bike:string) => {
  const date = generateTimestampz();
  const { error } = await supabase
    .from('rent')
    .insert({
      user_id: user,
      bike_id: bike,
      start_date: date
    })
}