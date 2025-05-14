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
export const getLocationDetailsById = async (locationId: string) => {
  const { data, error } = await supabase
    .from('location')
    .select('location_name, latitude, longitude')
    .eq('id', locationId)
    .single();

  if (error) {
    console.error(`Error al obtener la ubicación con id ${locationId}:`, error);
    return null;
  }

  return {
    name: data.location_name,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180); 
  const dLon = (lon2 - lon1) * (Math.PI / 180); 

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
};
