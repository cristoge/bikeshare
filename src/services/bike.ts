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
export const changeBikeStatus = async (bikeId: string, status: string) => {
  const { data, error } = await supabase
    .from('bike')
    .update({ status })
    .eq('id', bikeId);

  if (error) {
    console.error('Error updating bike status:', error)
    return null
  }
  console.log(data)
  return data
}