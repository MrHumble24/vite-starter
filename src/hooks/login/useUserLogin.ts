/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Admins, Students, Teacher } from "../../types/types";

interface TeacherState {
  user: any | null;
  setUser: (user: Teacher | Students | Admins | null) => void;
  removeUser: () => void;
}

const useUserStore = create<TeacherState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  removeUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useUserStore;
