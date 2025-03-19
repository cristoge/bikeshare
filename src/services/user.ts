import { supabase } from "./supabase"
import useUserStore from "../stores/userStore" // Adjust the path as necessary

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
//funciona 
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
//al hacer el login lo que hace es guardar la informacion del usuario en una variable global y eso hace que se pueda acceder desde toda la aplicación.
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Error logging in:', error)
    return null
  }
  useUserStore.setState({ user: data.user })
  console.log('esto es el store:', useUserStore.getState());
  return data
}
//funciona
export const changeDni = async (dni: string) => {
  const user = useUserStore.getState().user

  if (!user?.id) {
    console.error('No user found in store')
    return null
  }

  const { data, error } = await supabase
    .from('user')
    .update({ dni })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  console.log('User updated successfully:', data)
  return data
}
//falta implementar que se pueda cambiar tanto el nombre, como la foto de perfil
export const changeName = async (dni: string) => {
  const user = useUserStore.getState().user

  if (!user?.id) {
    console.error('No user found in store')
    return null
  }

  const { data, error } = await supabase
    .from('user')
    .update({ name })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  console.log('User updated successfully:', data)
  return data
}