import { supabase } from "./supabase"
export const createLocation = async () => {
  const { data, error } = await supabase
    .from('location')
    .insert([
      {
        location_name: 'Central Park',
        address: 'New York, NY 10024, USA',
        latitude: 40.785091,
        longitude: -73.968285
      }
    ])

  if (error) {
    console.error('Error inserting location:', error)
    return null
  }

  return data
}
export const getLocation = async () => {
  const { data, error } = await supabase
    .from('location')
    .select('*')

  if (error) {
    console.error('Error fetching locations:', error)
    return null
  }

  return data
}
