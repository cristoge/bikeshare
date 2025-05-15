import { generateTimestampz,calculateEndTime } from "../utils/generateTimestampz";
import { supabase } from "./supabase";
import { changeBikeStatus, changeLocation } from "./bike";
//la funcion para crear el alquiler funciona
import { simulationLocation } from "../utils/generateId";
export const createRent = async (userId: string, bikeId: string, startLocation_id: string) => {
  try {
    const date = generateTimestampz();
    const { data: rentData, error: rentError } = await supabase
      .from("rent")
      .insert({
        user_id: userId,
        bike_id: bikeId,
        start_date: date,
        status: "ongoing",
      })
      .select()
      .single();

    if (rentError) throw rentError;

    // Cambiar estado de la bici
    await changeBikeStatus(bikeId, "in_use");

    // Crear ruta con rent_id
    const { data: routeData, error: routeError } = await supabase
      .from("route")
      .insert([
        { rent_id: rentData.id, start_location_id: startLocation_id },
      ]);

    if (routeError) throw new Error(`Error creating route: ${routeError.message}`);

    return { rent: rentData, route: routeData };
  } catch (error) {
    console.error("Error creating rent and route:", error);
    throw error;
  }
};

/*este crea la reserva, la diferencia es el status y que en este crea 
un tiempo de reserva y una hora de fecha limite
*/
export const createReservation = async (userId: string, bikeId: string) => {
  try {
    const reservationStart = generateTimestampz();
    const reservationEnd = calculateEndTime(reservationStart);
    const { error } = await supabase.from("rent").insert({
      user_id: userId,
      bike_id: bikeId,
      status: "reserved",
      reservation_start: reservationStart,
      reservation_end: reservationEnd,
    });
    // Cambiar el estado de la bicicleta a "reserved"
    await changeBikeStatus(bikeId, "reserved");
    if (error) throw error;
  } catch (error) {
    console.error("Error creating reservation:", error);
  }
};
/*dependiendo de el estado de la reserva, si esta ongoing lo que hace es
pasarle el momento actual y guardarlo en la base de datos como tiempo final
en cambio si esta en reserva lo que hace es empezar el tiempo inicial
*/
export const handleRentStatus = async (id: string, status: string) => {
  try {
    const date = generateTimestampz();
    let updateData = {};

    if (status === "ongoing") {
      updateData = { end_date: date, status: "completed" };
    } else if (status === "reserved") {
      updateData = { start_date: date, status: "ongoing" };
    } else {
      throw new Error("Invalid status");
    }

    const { error } = await supabase
      .from("rent")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error handling rent status:", error);
  }
};

export const getTotalRentsByUser = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("rent")
      .select("id", { count: "exact" })
      .eq("user_id", userId);
    if (error) throw error;
    return data?.length || 0;
  } catch (error) {
    console.error("Error fetching total rents by user:", error);
    throw error;
  }
};

export const endRent = async (rentId: string, bikeId: string, endLocation_id=simulationLocation) => {
  try {
    const date = generateTimestampz();

    // Actualizar la tabla rent con end_date y estado "completed"
    const { error: rentError } = await supabase
      .from("rent")
      .update({
        end_date: date,
        status: "completed",
      })
      .eq("id", rentId);

    if (rentError) throw new Error(`Error updating rent: ${rentError.message}`);

    // Cambiar estado de la bici a "available"
    await changeBikeStatus(bikeId, "available");
    await changeLocation(bikeId)
    // Actualizar la tabla route con end_location_id
    const { error: routeError } = await supabase
      .from("route")
      .update({ final_location_id: endLocation_id })
      .eq("rent_id", rentId);

    if (routeError) throw new Error(`Error updating route: ${routeError.message}`);

    return { message: "Rent and route successfully ended." };
  } catch (error) {
    console.error("Error ending rent and route:", error);
    throw error;
  }
};

//final

export const getUserRents = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("rent")
      .select("*")
      .eq("user_id", userId)
      .not("end_date", "is", null)
      .order("start_date", { ascending: false });
    if (error) throw error;
    console.log("User rents:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user rents:", error);
    throw error;
  }
};