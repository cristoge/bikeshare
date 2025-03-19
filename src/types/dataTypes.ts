import { Database } from "./db";

export type Bike = Database['public']['Tables']['bike']['Row'];

export type Location = Database['public']['Tables']['location']['Row'];

export type Model = Database['public']['Tables']['model']['Row'];

export type Notification = Database['public']['Tables']['notification']['Row'];

export type Rent = Database['public']['Tables']['rent']['Row'];

export type Route = Database['public']['Tables']['route']['Row'];

export type User = Database['public']['Tables']['user']['Row'];

export type Enums = {
  bike_status: "available" | "in_use" | "reserved" | "maintenance";
  rent_status: "ongoing" | "completed" | "canceled" | "expired" | "penalized" | "reserved";
  user_role: "user" | "admin";
};
