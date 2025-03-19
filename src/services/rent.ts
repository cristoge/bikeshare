import { generateTimestampz } from "../utils/generateTimestampz";
import { supabase } from "./supabase";

const createRent = async (userId: string, bikeId: string) => {
  try {
    const date = generateTimestampz();
    const { error } = await supabase.from("rent").insert({
      user_id: userId,
      bike_id: bikeId,
      start_date: date,
      status: "ongoing",
    });
    
    if (error) throw error;
  } catch (error) {
    console.error("Error creating rent:", error);
  }
};

export const createReservation = async (userId: string, bikeId: string) => {
  try {
    const date = generateTimestampz();
    const { error } = await supabase.from("rent").insert({
      user_id: userId,
      bike_id: bikeId,
      status: "reserved",
      reservation_start: date,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error creating reservation:", error);
  }
};

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
