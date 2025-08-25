import { create } from "zustand";

interface User {
  employeeId: string;
  lastName: string;
  firstName: string;
}

interface UserStore {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User | null) => set({ user }),
}));
