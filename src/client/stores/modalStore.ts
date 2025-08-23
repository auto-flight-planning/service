import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  content: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,

  openModal: (content: React.ReactNode) => set({ isOpen: true, content }),

  closeModal: () => set({ isOpen: false, content: null }),
}));
