import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  modalName: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalName: null,

  openModal: (modalName: string) => set({ isOpen: true, modalName }),
  closeModal: () => set({ isOpen: false, modalName: null }),
}));
