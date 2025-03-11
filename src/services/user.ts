import { supabase } from "./supabase"

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('user')
    .select('*')

  if (error) {
    console.error('Error fetching users:', error)
    return null
  }
  console.log(data)
  return data
}

export const createUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    console.error('Error creating user:', error)
    return null
  } 
  return data
}
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Error logging in:', error)
    return null
  }
  return data
}