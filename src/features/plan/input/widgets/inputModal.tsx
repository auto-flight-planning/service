"use client";

import { useEffect, useMemo } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { useModalStore, NumberModalHeader, ModalTab } from "@/features/modal";
import { Spinner } from "@/components/spinner";
import useInputModalTypeStore from "../stores/inputModalTypeStore";

export default function InputModal<T, F extends FieldValues>({
  title,
  number,
  fetchData,
  formMethods,
  FormTabComponent,
  ExplainTabComponent,
}: {
  title: string;
  number: number;
  fetchData: T | undefined;
  formMethods: UseFormReturn<F>;
  FormTabComponent: React.FC;
  ExplainTabComponent: React.FC;
}) {
  const { closeModal } = useModalStore();

  const { reset } = useInputModalTypeStore();
  useEffect(() => {
    reset();
  }, []);

  const tabs = useMemo(
    () => [
      {
        id: "data-input",
        label: "データ入力",
        content: !fetchData ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="lg" />
          </div>
        ) : (
          <FormTabComponent />
        ),
      },
      {
        id: "detail",
        label: "詳細説明",
        content: <ExplainTabComponent />,
      },
    ],
    [fetchData]
  );

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberModalHeader title={title} number={number} onClose={closeModal} />
      <FormProvider {...formMethods}>
        <ModalTab tabs={tabs} defaultTab="data-input" />
      </FormProvider>
    </div>
  );
}
