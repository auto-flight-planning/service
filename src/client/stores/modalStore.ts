import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  modalName: string | null;
  modalProps: Record<string, any> | null;
  openModal: (modalName: string, props?: Record<string, any>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalName: null,
  modalProps: null,

  openModal: (modalName: string, props?: Record<string, any>) =>
    set({ isOpen: true, modalName, modalProps: props || null }),
  closeModal: () => set({ isOpen: false, modalName: null, modalProps: null }),
}));
