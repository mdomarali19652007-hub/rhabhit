export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_published: boolean | null
          title: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          year?: number
        }
        Relationships: []
      }
      admissions: {
        Row: {
          admin_notes: string | null
          admission_session: string | null
          admission_year: number
          application_number: string
          blood_group: string | null
          created_at: string
          date_of_birth: string
          desired_department: string | null
          desired_department_id: string | null
          email: string | null
          father_name: string
          gender: string
          guardian_name: string | null
          guardian_phone: string | null
          guardian_relation: string | null
          hsc_board: string | null
          hsc_certificate_url: string | null
          hsc_gpa: number | null
          hsc_group: string | null
          hsc_roll: string | null
          hsc_year: number | null
          id: string
          mother_name: string
          national_id: string | null
          nationality: string | null
          permanent_address: string | null
          phone: string
          photo_url: string | null
          present_address: string
          religion: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          signature_url: string | null
          ssc_board: string | null
          ssc_certificate_url: string | null
          ssc_gpa: number | null
          ssc_group: string | null
          ssc_roll: string | null
          ssc_year: number | null
          status: string | null
          student_name: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          admission_session?: string | null
          admission_year: number
          application_number: string
          blood_group?: string | null
          created_at?: string
          date_of_birth: string
          desired_department?: string | null
          desired_department_id?: string | null
          email?: string | null
          father_name: string
          gender: string
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relation?: string | null
          hsc_board?: string | null
          hsc_certificate_url?: string | null
          hsc_gpa?: number | null
          hsc_group?: string | null
          hsc_roll?: string | null
          hsc_year?: number | null
          id?: string
          mother_name: string
          national_id?: string | null
          nationality?: string | null
          permanent_address?: string | null
          phone: string
          photo_url?: string | null
          present_address: string
          religion?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          signature_url?: string | null
          ssc_board?: string | null
          ssc_certificate_url?: string | null
          ssc_gpa?: number | null
          ssc_group?: string | null
          ssc_roll?: string | null
          ssc_year?: number | null
          status?: string | null
          student_name: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          admission_session?: string | null
          admission_year?: number
          application_number?: string
          blood_group?: string | null
          created_at?: string
          date_of_birth?: string
          desired_department?: string | null
          desired_department_id?: string | null
          email?: string | null
          father_name?: string
          gender?: string
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relation?: string | null
          hsc_board?: string | null
          hsc_certificate_url?: string | null
          hsc_gpa?: number | null
          hsc_group?: string | null
          hsc_roll?: string | null
          hsc_year?: number | null
          id?: string
          mother_name?: string
          national_id?: string | null
          nationality?: string | null
          permanent_address?: string | null
          phone?: string
          photo_url?: string | null
          present_address?: string
          religion?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          signature_url?: string | null
          ssc_board?: string | null
          ssc_certificate_url?: string | null
          ssc_gpa?: number | null
          ssc_group?: string | null
          ssc_roll?: string | null
          ssc_year?: number | null
          status?: string | null
          student_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admissions_desired_department_id_fkey"
            columns: ["desired_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          head_name: string | null
          id: string
          is_active: boolean | null
          name: string
          name_en: string | null
          student_count: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          head_name?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_en?: string | null
          student_count?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          head_name?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_en?: string | null
          student_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      faculty: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          department_id: string | null
          department_name: string | null
          designation: string
          display_order: number | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department_id?: string | null
          department_name?: string | null
          designation: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          department_id?: string | null
          department_name?: string | null
          designation?: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "faculty_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_published: boolean | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_published?: boolean | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_published?: boolean | null
          title?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          attachment_url: string | null
          category: Database["public"]["Enums"]["notice_category"] | null
          content: string | null
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_published: boolean | null
          is_urgent: boolean | null
          published_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          attachment_url?: string | null
          category?: Database["public"]["Enums"]["notice_category"] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          is_urgent?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          attachment_url?: string | null
          category?: Database["public"]["Enums"]["notice_category"] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          is_urgent?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_teacher: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "teacher" | "staff"
      notice_category:
        | "general"
        | "admission"
        | "exam"
        | "result"
        | "event"
        | "scholarship"
        | "urgent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "staff"],
      notice_category: [
        "general",
        "admission",
        "exam",
        "result",
        "event",
        "scholarship",
        "urgent",
      ],
    },
  },
} as const
