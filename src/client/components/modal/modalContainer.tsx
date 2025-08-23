"use client";

import { useModalStore } from "@/client/stores";
import Modal from "./modal";

export default function ModalContainer() {
  const { isOpen, content, closeModal } = useModalStore();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {content}
    </Modal>
  );
}
