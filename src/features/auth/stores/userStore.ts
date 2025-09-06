import { create } from "zustand";

export interface User {
  employeeId: string;
  userId: string;
  lastName: string;
  firstName: string;
  email: string;
}

interface UserStore {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User | null) => set({ user }),
}));

export default useUserStore;
