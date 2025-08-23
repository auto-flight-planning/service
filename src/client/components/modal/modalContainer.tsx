"use client";

import { useState, useEffect } from "react";
import { useModalStore } from "@/client/stores";
import Modal from "./modal";
import LoginModal from "@/client/features/auth/login/modal";
import SignUpModal from "@/client/features/auth/signUp/modal";

const MODAL_COMPONENTS = {
  login: LoginModal,
  signUp: SignUpModal,
};

export default function ModalContainer() {
  const { isOpen, modalName, closeModal } = useModalStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isOpen && modalName) {
      // isOpen이 true가 되고 100ms 후에 모달 표시
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [isOpen, modalName]);

  if (!isOpen || !modalName) return null;

  const ModalComponent =
    MODAL_COMPONENTS[modalName as keyof typeof MODAL_COMPONENTS];

  return (
    <Modal isOpen={isReady} onClose={closeModal}>
      <ModalComponent />
    </Modal>
  );
}
