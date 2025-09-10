"use client";

import { useState, useEffect } from "react";
import useModalStore from "../stores/modalStore";
import Modal from "../components/modal";

// MODAL_COMPONENTS
import { LoginModal } from "@/features/auth";
import { CreatePlanModal } from "@/features/plan/base/create";
import { EditTitleModal } from "@/features/plan/base/view";
import { ParticipantViewModal } from "@/features/plan/participant";
import { ParticipantsEditModal } from "@/features/plan/participant";
// import { ResourceInputModal } from "@/features/plan/input/resource/totalPerson";
// import { FlightScaleModal } from "@/features/plan/input/resource/flightScale";

export default function ModalContainer() {
  const MODAL_COMPONENTS = {
    login: LoginModal,
    createPlan: CreatePlanModal,
    editTitle: EditTitleModal,
    participantView: ParticipantViewModal,
    participantsEdit: ParticipantsEditModal,
    // resourceInput: ResourceInputModal,
    // flightScaleInput: FlightScaleModal,
  };

  const { isOpen, modalName, modalProps, closeModal } = useModalStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isOpen && modalName) {
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
      <ModalComponent {...(modalProps as any)} />
    </Modal>
  );
}
