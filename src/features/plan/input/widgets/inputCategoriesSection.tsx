"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Spinner } from "@/components/spinner";
import InputCategoryCard, { IconColor } from "../components/inputCategoryCard";
import {
  getAnalyticsInputStatusItems,
  getResourceInputStatusItems,
  useGetPlanInputStatus,
} from "@/features/plan/status";
import { getOverallStatus } from "@/features/plan/status/utils";
import { INPUT_CATEGORY_LABELS } from "@/features/plan/input/constant";

export default function InputCategoriesSection({ planId }: { planId: string }) {
  const { planInputStatus } = useGetPlanInputStatus(planId);
  const router = useRouter();

  const statuses = useMemo(() => {
    if (!planInputStatus) return undefined;

    const resourceItems = getResourceInputStatusItems(planInputStatus);
    const resourceStatus = getOverallStatus(resourceItems);

    const analyticsItems = getAnalyticsInputStatusItems(planInputStatus);
    const analyticsStatus = getOverallStatus(analyticsItems);

    const statuses = {
      resource: { items: resourceItems, status: resourceStatus },
      analytics: { items: analyticsItems, status: analyticsStatus },
      airport: { status: planInputStatus.airportsScheduleDataStatus },
    };
    return statuses;
  }, [planInputStatus]);

  if (!planInputStatus || !statuses) {
    return (
      <div className="bg-white shadow-lg rounded-xl h-[25rem] w-full flex justify-center items-center">
        <Spinner size="large" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <InputCategoryCard
        icon={{ text: "🏢", color: IconColor.PRIMARY }}
        title={INPUT_CATEGORY_LABELS.RESOURCE}
        inputSource="運航本部総括部・財務部"
        status={statuses.resource.status}
        description="自社が保有する人員、航空機などの資源の保有量を基に、実現可能な運航日程を企画します。"
        listItems={statuses.resource.items}
        onClick={() => router.push(`/plan/${planId}/input/resource`)}
      />
      <InputCategoryCard
        icon={{ text: "📊", color: IconColor.PURPLE }}
        title={INPUT_CATEGORY_LABELS.ANALYTICS}
        inputSource="外部データ分析協力会社"
        status={statuses.analytics.status}
        description="過去の運航実績データや人気旅行先関連の需要などを分析し算出したデータを基に、収益性の高い運航日程を企画します。"
        listItems={statuses.analytics.items}
        onClick={() => router.push(`/plan/${planId}/input/analytics`)}
      />
      <InputCategoryCard
        icon={{ text: "🛫", color: IconColor.GREEN }}
        title={INPUT_CATEGORY_LABELS.AIRPORT}
        inputSource="連携空港"
        status={statuses.airport.status}
        description="連携空港の運航日程に合わせ、可能な時間帯に運航日程を割り当てます。"
        listItems={[]}
        onClick={() => router.push(`/plan/${planId}/input/airport`)}
      />
    </div>
  );
}
