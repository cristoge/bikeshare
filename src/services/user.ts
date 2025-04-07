import { supabase } from "./supabase"
import useUserStore from "../stores/userStore" // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  });

  if (error) {
    console.error('Error logging in:', error);
    return null;
  }

  // Obtener datos adicionales del usuario de la tabla 'user' (vinculada con el user de supabase)
  const { data: userData, error: userError } = await supabase
    .from('user') 
    .select('*') 
    .eq('email', email) 
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError);
    return null;
  }

  const userName = userData?.name || email.split('@')[0];
  const dni = userData?.dni 
  // Si no tiene nombre, usa la parte del correo antes de '@'
  const finalUser = { ...data.user, name: userName, dni: dni };

  useUserStore.setState({ user: finalUser }); // Guardar el usuario en el store
  await AsyncStorage.setItem('user', JSON.stringify(finalUser)); // Guardar el usuario en AsyncStorage
  console.log('Usuario logueado:', userData);
  return data;
};


export const loadUserFromStorage = async () => {
  const userString = await AsyncStorage.getItem('user')

  if (userString) {
    const user = JSON.parse(userString)
    useUserStore.setState({ user }) 
    return user
  }

  return null
}
export const logout = async () => {
  await supabase.auth.signOut()
  await AsyncStorage.removeItem('user')
  useUserStore.setState({ user: null })
}

//funciona
export const forgotPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.error('Error enviando email de recuperación de contraseña:', error)
    return null
  }

  console.log('Email de recuperación enviado:', data)
  return data
}
