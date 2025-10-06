import { create } from "zustand";

interface InputModalTypeStore {
  inputModalType: "edit" | "view";
  setInputModalType: (inputModalType: "edit" | "view") => void;
  reset: () => void;
}

const useInputModalTypeStore = create<InputModalTypeStore>((set) => ({
  inputModalType: "view",
  setInputModalType: (inputModalType) => set({ inputModalType }),
  reset: () => set({ inputModalType: "view" }),
}));

export default useInputModalTypeStore;
