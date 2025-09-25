"use client";

import { useMemo } from "react";
import { useModalStore } from "@/features/modal";
import {
  useGetPlanInputStatus,
  getResourceInputStatusItems,
} from "@/features/plan/status";
import { Spinner } from "@/components/spinner";
import { INPUT_DATA_DETAIL_LABELS, INPUT_DATA_LABELS } from "../../constant";
import InputContainer from "../../widgets/inputContainer";

export default function ResourceInputContainer() {
  const { openModal } = useModalStore();
  const { planInputStatus } = useGetPlanInputStatus();

  const inputItems = useMemo(() => {
    if (!planInputStatus) return [];
    const statuses = getResourceInputStatusItems(planInputStatus);
    return [
      {
        number: 1,
        title: INPUT_DATA_LABELS.RESOURCES_WORKFORCE,
        items: Object.values(INPUT_DATA_DETAIL_LABELS.RESOURCES_WORKFORCE),
        status: statuses[0].status,
        onClick: () => {
          openModal("workforceInput");
        },
      },
      {
        number: 2,
        title: INPUT_DATA_LABELS.RESOURCES_FLIGHT_SCALES,
        items: null,
        status: statuses[1].status,
        onClick: () => {},
      },
      {
        number: 3,
        title: INPUT_DATA_LABELS.RESOURCES_FLIGHT_SCALE_DATA,
        items: Object.values(
          INPUT_DATA_DETAIL_LABELS.RESOURCES_FLIGHT_SCALE_DATA
        ),
        status: statuses[2].status,
        onClick: () => {},
      },
    ];
  }, [planInputStatus]);

  if (!planInputStatus) {
    return (
      <div className="rounded-xl bg-white h-60 w-full flex justify-center items-center shadow-md">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <InputContainer
      categoryProps={{
        inputItems,
        mailContainerMessage: `運航本部総括部と財務部に、自社資源データの入力を依頼してください。\n
        依頼メールには本ページにアクセス可能なURLが添付され、各部署から入力できるようになります。`,
        onClickSendMail: () => {},
      }}
    />
  );
}
