import { supabase } from "./supabase"

export const getBikes = async () => {
  const { data, error } = await supabase
    .from('bike')
    .select(`
      id,
      status,
      model: model_id (model_name),
      location: current_location_id (
        latitude,
        longitude,
        location_name,
        address
      )
    `);

  if (error) {
    console.error('Error fetching bikes:', error)
    return null
  }
  console.log(data)
  return data
}
