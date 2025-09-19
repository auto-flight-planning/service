"use client";

import { useMemo } from "react";
import { useModalStore } from "@/features/modal";
import {
  useGetPlanInputStatus,
  getAnalyticsInputStatusItems,
} from "@/features/plan/status";
import { Spinner } from "@/components/spinner";
import { INPUT_DATA_DETAIL_LABELS, INPUT_DATA_LABELS } from "../../constant";
import InputContainer from "../../widgets/inputContainer";

export default function ResourceInputContainer({ planId }: { planId: string }) {
  const { openModal } = useModalStore();
  const { planInputStatus } = useGetPlanInputStatus(planId);

  const inputItems = useMemo(() => {
    if (!planInputStatus) return [];
    const statuses = getAnalyticsInputStatusItems(planInputStatus);
    return [
      {
        number: 1,
        title: INPUT_DATA_LABELS.ANALYTICS_FLIGHT_CANDIDATES,
        items: Object.values(
          INPUT_DATA_DETAIL_LABELS.ANALYTICS_FLIGHT_CANDIDATES
        ),
        status: statuses[0].status,
        onClick: () => {},
      },
      {
        number: 2,
        title: INPUT_DATA_LABELS.ANALYTICS_ROUND_TRIP_NORMALIZATION_FUNC,
        items: null,
        status: statuses[1].status,
        onClick: () => {},
      },
      {
        number: 3,
        title: INPUT_DATA_LABELS.ANALYTICS_ROUTE_MIN_DISTRIBUTION,
        items: null,
        status: statuses[2].status,
        onClick: () => {},
      },
    ];
  }, [planInputStatus]);

  if (!planInputStatus) {
    return (
      <div className="rounded-xl bg-white h-60 w-full flex justify-center items-center shadow-md">
        <Spinner size="large" />
      </div>
    );
  }
  return (
    <InputContainer
      categoryProps={{
        inputItems,
        mailContainerMessage: `外部データ分析協力会社に、運航計画に必要な分析データの入力を依頼してください。\n
        依頼メールには本ページにアクセス可能なURLが添付され、外部の協力会社から入力できるようになります。`,
        onClickSendMail: () => {},
      }}
    />
  );
}
