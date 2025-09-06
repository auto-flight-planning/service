import { create } from "zustand";

export interface User {
  userId: string;
  employeeId: string;
  lastName: string;
  firstName: string;
  email: string;
}

interface UserStore {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User | null) => set({ user }),
}));
