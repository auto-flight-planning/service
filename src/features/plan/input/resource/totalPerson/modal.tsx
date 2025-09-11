"use client";

import { FormProvider } from "react-hook-form";
import { useModalStore } from "@/features/modal";
import {
  NumberedModalHeader,
  BasicModalFooter,
  ModalTab,
} from "@/features/modal/components";
import { Spinner } from "@/components/spinner";
import { useTotalPersonResource, TotalPersonForm, TotalPersonExplain } from ".";
import { InputModalProps } from "../../types";

export default function ResourceInputModal({
  planId = "",
  type = "edit",
}: InputModalProps) {
  const { formMethods, onValidSubmit, isPendingToGet, isPendingToUpdate } =
    useTotalPersonResource(planId);
  const { handleSubmit } = formMethods;
  const { closeModal, openModal } = useModalStore();

  const tabs = [
    {
      id: "data-input",
      label: "データ入力",
      content: isPendingToGet ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="medium" />
        </div>
      ) : (
        <TotalPersonForm planId={planId} type={type} />
      ),
    },
    {
      id: "detail",
      label: "詳細説明",
      content: <TotalPersonExplain />,
    },
  ];

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberedModalHeader
        title="総人員データ"
        number={1}
        onClose={closeModal}
      />
      <FormProvider {...formMethods}>
        <ModalTab tabs={tabs} defaultTab="data-input" />
        <div className="px-4 pb-4 pt-2 border-t border-gray-200">
          {/* {type === "edit" ? (
            <BasicModalFooter
              confirmText="保存"
              showCancel={false}
              leftText="保存すると企画部に自動で通知が送信されます"
              onConfirm={handleSubmit(onValidSubmit)}
              isPending={isPendingToUpdate}
              onBorder={false}
            />
          ) : (
            <BasicModalFooter
              confirmText="変更"
              showCancel={false}
              onConfirm={() =>
                openModal("resourceInput", {
                  planId,
                  type: "edit",
                })
              }
              onBorder={false}
            />
          )} */}
        </div>
      </FormProvider>
    </div>
  );
}
