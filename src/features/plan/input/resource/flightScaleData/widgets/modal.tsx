"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import useGetFlightScaleData from "../hooks/useGetFlightScaleData";
import useFlightScaleDataForm from "../hooks/useFlightScaleDataForm";
import { useModalStore, NumberModalHeader, ModalTab } from "@/features/modal";
import { Spinner } from "@/components/spinner";
import FlightScaleDataForm from "./form";
import FlightScaleDataExplain from "./explain";

export default function FlightScaleDataInputModal() {
  const { closeModal } = useModalStore();
  const { flightScaleData } = useGetFlightScaleData();
  const { formMethods } = useFlightScaleDataForm();

  const useTypeState = useState<"edit" | "view">("view");
  const tabs = [
    {
      id: "data-input",
      label: "データ入力",
      content: !flightScaleData ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <FlightScaleDataForm />
        // <FlightScaleDataForm useTypeState={useTypeState} />
      ),
    },
    {
      id: "detail",
      label: "詳細説明",
      content: <FlightScaleDataExplain />,
    },
  ];

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberModalHeader
        title="運航規模別データ"
        number={2}
        onClose={closeModal}
      />
      <FormProvider {...formMethods}>
        <ModalTab tabs={tabs} defaultTab="data-input" />
      </FormProvider>
    </div>
  );
}
