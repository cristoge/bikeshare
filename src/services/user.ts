import { supabase } from "./supabase"

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('user')
    .select('*')

  if (error) {
    console.error('Error fetching users:', error)
    return null
  }

  return data
}