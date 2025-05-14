import { supabase } from "./supabase"

export const getRouteByRentId = async (rentId: string) => {
  const { data, error } = await supabase
    .from('route')
    .select('*') 
    .eq('rent_id', rentId)
    .single(); 

  if (error) {
    console.error('Error al obtener la ruta:', error);
    return null;
  }

  return data;
};
export const getLocationNameById = async (locationId: string) => {
  const { data, error } = await supabase
    .from('location')
    .select('location_name')
    .eq('id', locationId)
    .single();

  if (error) {
    console.error(`Error al obtener la ubicación con id ${locationId}:`, error);
    return null;
  }

  return data.location_name;
};