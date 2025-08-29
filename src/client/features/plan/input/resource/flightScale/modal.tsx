import { useModalStore } from "@/client/stores";
import { InputModalProps } from "../../types";
import {
  BasicModalFooter,
  ModalTab,
  NumberedModalHeader,
} from "@/client/components/modal";
import { FlightScaleExplain } from ".";

export default function FlightScaleModal({
  planId = "",
  type = "edit",
}: InputModalProps) {
  const { closeModal, openModal } = useModalStore();

  const tabs = [
    {
      id: "data-input",
      label: "データ入力",
      content: <>data input</>,
      //   content: isPendingToGet ? (
      //     <div className="flex justify-center items-center h-full">
      //       <Spinner size="md" />
      //     </div>
      //   ) : (
      //     <TotalPersonForm planId={planId} type={type} />
      //   ),
    },
    {
      id: "detail",
      label: "詳細説明",
      content: <FlightScaleExplain />,
    },
  ];

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberedModalHeader
        title="運航規模の種類"
        number={2}
        onClose={closeModal}
      />
      {/* <FormProvider {...formMethods}> */}
      <ModalTab tabs={tabs} defaultTab="data-input" />
      <div className="px-4 pb-4 pt-2 border-t border-gray-200">
        {type === "edit" ? (
          <BasicModalFooter
            confirmText="保存"
            showCancel={false}
            leftText="保存すると企画部に自動で通知が送信されます"
            onConfirm={() => {}}
            //   onConfirm={handleSubmit(onValidSubmit)}
            //   isPending={isPendingToUpdate}
            onBorder={false}
          />
        ) : (
          <BasicModalFooter
            confirmText="編集"
            showCancel={false}
            onConfirm={() =>
              openModal("flightScaleInput", {
                planId,
                type: "edit",
              })
            }
            onBorder={false}
          />
        )}
      </div>
      {/* </FormProvider> */}
    </div>
  );
}
