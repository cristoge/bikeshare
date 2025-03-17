export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bike: {
        Row: {
          current_location_id: string
          id: string
          model_id: string
          status: Database["public"]["Enums"]["bike_status"]
        }
        Insert: {
          current_location_id: string
          id?: string
          model_id: string
          status: Database["public"]["Enums"]["bike_status"]
        }
        Update: {
          current_location_id?: string
          id?: string
          model_id?: string
          status?: Database["public"]["Enums"]["bike_status"]
        }
        Relationships: [
          {
            foreignKeyName: "bike_current_location_id_fkey"
            columns: ["current_location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bike_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model"
            referencedColumns: ["id"]
          },
        ]
      }
      location: {
        Row: {
          address: string
          id: string
          latitude: number
          location_name: string
          longitude: number
        }
        Insert: {
          address: string
          id?: string
          latitude: number
          location_name: string
          longitude: number
        }
        Update: {
          address?: string
          id?: string
          latitude?: number
          location_name?: string
          longitude?: number
        }
        Relationships: []
      }
      model: {
        Row: {
          id: string
          model_name: string
        }
        Insert: {
          id?: string
          model_name: string
        }
        Update: {
          id?: string
          model_name?: string
        }
        Relationships: []
      }
      notification: {
        Row: {
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      rent: {
        Row: {
          bike_id: string
          end_date: string | null
          id: string
          reservation_end: string | null
          reservation_start: string | null
          start_date: string
          status: Database["public"]["Enums"]["rent_status"]
          user_id: string
        }
        Insert: {
          bike_id: string
          end_date?: string | null
          id?: string
          reservation_end?: string | null
          reservation_start?: string | null
          start_date: string
          status: Database["public"]["Enums"]["rent_status"]
          user_id: string
        }
        Update: {
          bike_id?: string
          end_date?: string | null
          id?: string
          reservation_end?: string | null
          reservation_start?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["rent_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rent_bike_id_fkey"
            columns: ["bike_id"]
            isOneToOne: false
            referencedRelation: "bike"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rent_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      route: {
        Row: {
          created_at: string | null
          distance_km: number | null
          final_latitude: number | null
          final_longitude: number | null
          id: string
          initial_latitude: number
          initial_longitude: number
          rent_id: string
        }
        Insert: {
          created_at?: string | null
          distance_km?: number | null
          final_latitude?: number | null
          final_longitude?: number | null
          id?: string
          initial_latitude: number
          initial_longitude: number
          rent_id: string
        }
        Update: {
          created_at?: string | null
          distance_km?: number | null
          final_latitude?: number | null
          final_longitude?: number | null
          id?: string
          initial_latitude?: number
          initial_longitude?: number
          rent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "route_rent_id_fkey"
            columns: ["rent_id"]
            isOneToOne: false
            referencedRelation: "rent"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          dni: string | null
          email: string
          id: string
          name: string | null
          profile_picture: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          dni?: string | null
          email: string
          id?: string
          name?: string | null
          profile_picture?: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          dni?: string | null
          email?: string
          id?: string
          name?: string | null
          profile_picture?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bike_status: "available" | "in_use" | "reserved" | "maintenance"
      rent_status:
        | "ongoing"
        | "completed"
        | "canceled"
        | "expired"
        | "penalized"
        | "reserved"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
