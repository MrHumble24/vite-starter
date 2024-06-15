export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      assignments: {
        Row: {
          created_at: string;
          id: number;
          isChecked: boolean | null;
          isSubmitted: boolean | null;
          studentID: number | null;
          submittedTime: string | null;
          taskID: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isChecked?: boolean | null;
          isSubmitted?: boolean | null;
          studentID?: number | null;
          submittedTime?: string | null;
          taskID?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          isChecked?: boolean | null;
          isSubmitted?: boolean | null;
          studentID?: number | null;
          submittedTime?: string | null;
          taskID?: number | null;
        };
        Relationships: [];
      };
      classes: {
        Row: {
          created_at: string;
          id: number;
          isActive: boolean | null;
          name: number[] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isActive?: boolean | null;
          name?: number[] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          isActive?: boolean | null;
          name?: number[] | null;
        };
        Relationships: [];
      };
      exams: {
        Row: {
          class: number | null;
          created_at: string;
          id: number;
          name: number | null;
          scheduled: string | null;
        };
        Insert: {
          class?: number | null;
          created_at?: string;
          id?: number;
          name?: number | null;
          scheduled?: string | null;
        };
        Update: {
          class?: number | null;
          created_at?: string;
          id?: number;
          name?: number | null;
          scheduled?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "exams_class_fkey";
            columns: ["class"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
      marks: {
        Row: {
          created_at: string;
          exam: number | null;
          id: number;
          listening: number | null;
          ordinaryMark: number | null;
          reading: number | null;
          speaking: number | null;
          studentID: number | null;
          writing: number | null;
        };
        Insert: {
          created_at?: string;
          exam?: number | null;
          id?: number;
          listening?: number | null;
          ordinaryMark?: number | null;
          reading?: number | null;
          speaking?: number | null;
          studentID?: number | null;
          writing?: number | null;
        };
        Update: {
          created_at?: string;
          exam?: number | null;
          id?: number;
          listening?: number | null;
          ordinaryMark?: number | null;
          reading?: number | null;
          speaking?: number | null;
          studentID?: number | null;
          writing?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "marks_exam_fkey";
            columns: ["exam"];
            isOneToOne: false;
            referencedRelation: "exams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "marks_studentID_fkey";
            columns: ["studentID"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      progresses: {
        Row: {
          classID: number | null;
          created_at: string;
          id: number;
          progress: number | null;
          regress: number | null;
          studentID: number | null;
        };
        Insert: {
          classID?: number | null;
          created_at?: string;
          id?: number;
          progress?: number | null;
          regress?: number | null;
          studentID?: number | null;
        };
        Update: {
          classID?: number | null;
          created_at?: string;
          id?: number;
          progress?: number | null;
          regress?: number | null;
          studentID?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "progresses_classID_fkey";
            columns: ["classID"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "progresses_studentID_fkey";
            columns: ["studentID"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      students: {
        Row: {
          age: string | null;
          class: number | null;
          created_at: string;
          dateEnrollment: string | null;
          failedAttempts: number | null;
          firstName: string | null;
          id: number;
          lastName: string | null;
          password: string | null;
          telegramUsername: string | null;
          username: string | null;
        };
        Insert: {
          age?: string | null;
          class?: number | null;
          created_at?: string;
          dateEnrollment?: string | null;
          failedAttempts?: number | null;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          password?: string | null;
          telegramUsername?: string | null;
          username?: string | null;
        };
        Update: {
          age?: string | null;
          class?: number | null;
          created_at?: string;
          dateEnrollment?: string | null;
          failedAttempts?: number | null;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          password?: string | null;
          telegramUsername?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "students_class_fkey";
            columns: ["class"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
      tasks: {
        Row: {
          class: number | null;
          created_at: string;
          deadline: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          class?: number | null;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          class?: number | null;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_class_fkey";
            columns: ["class"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
      teachers: {
        Row: {
          class: number | null;
          created_at: string;
          firstName: string | null;
          id: number;
          lastName: string | null;
          password: string | null;
          phone: string | null;
          role: string | null;
          username: string | null;
        };
        Insert: {
          class?: number | null;
          created_at?: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          password?: string | null;
          phone?: string | null;
          role?: string | null;
          username?: string | null;
        };
        Update: {
          class?: number | null;
          created_at?: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          password?: string | null;
          phone?: string | null;
          role?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "teachers_class_fkey";
            columns: ["class"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
