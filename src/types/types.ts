// types.ts
export type Teacher = {
  class: number | null;
  created_at: string;
  firstName: string | null;
  id: number;
  lastName: string | null;
  password: string | null;
  phone: string | null;
  role: string | null;
  username: string | null;
  classes?:
    | {
        id: number;
        name: string;
        teacher: number;
      }[]
    | null;
};

export type Classes = {
  id: number;
  created_at: string;
  name: string;
  teacher: number;
  teachers?: Teacher | null;
};
export type Exams = {
  class: number | null;
  created_at: string;
  id: number;
  name: number | null;
  scheduled: string | null;
  classes?: {
    id: number;
    name: string;
    teacher: number;
  } | null;
};
export type Students = {
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
  classes?: {
    id: number;
    name: string;
    teacher: number;
  } | null;
};
