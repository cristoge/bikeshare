import { supabase } from "./supabase"

export const getBikes = async () => {
  const { data, error } = await supabase
    .from('bike')
    .select('*');

  if (error) {
    console.error('Error fetching bikes:', error)
    return null
  }
  console.log(data)
  return data
}
