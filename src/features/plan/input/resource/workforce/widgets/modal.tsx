"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import useGetWorkforce from "../hooks/useGetWorkforce";
import useWorkforceForm from "../hooks/useWorkforceForm";
import { useModalStore, NumberModalHeader, ModalTab } from "@/features/modal";
import { Spinner } from "@/components/spinner";
import WorkforceForm from "./form";
import WorkforceExplain from "./explain";

export default function WorkforceInputModal() {
  const { closeModal } = useModalStore();
  const { workforceData } = useGetWorkforce();
  const { formMethods } = useWorkforceForm();

  const useTypeState = useState<"edit" | "view">("view");
  const tabs = [
    {
      id: "data-input",
      label: "データ入力",
      content: !workforceData ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <WorkforceForm useTypeState={useTypeState} />
      ),
    },
    {
      id: "detail",
      label: "詳細説明",
      content: <WorkforceExplain />,
    },
  ];

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberModalHeader title="総人員データ" number={1} onClose={closeModal} />
      <FormProvider {...formMethods}>
        <ModalTab tabs={tabs} defaultTab="data-input" />
      </FormProvider>
    </div>
  );
}
