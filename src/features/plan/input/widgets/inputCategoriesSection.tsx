"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePlanId } from "@/features/plan/stores/planStore";
import { Spinner } from "@/components/spinner";
import InputCategoryCard from "../components/inputCategoryCard";
import {
  getAnalyticsInputStatusItems,
  getResourceInputStatusItems,
  useGetPlanInputStatus,
} from "@/features/plan/status";
import { getOverallStatus } from "@/features/plan/status/utils";
import { INPUT_CATEGORY_LABELS } from "@/features/plan/input/constant";

export default function InputCategoriesSection() {
  const planId = usePlanId();
  const router = useRouter();
  const { planInputStatus } = useGetPlanInputStatus();

  const statuses = useMemo(() => {
    if (!planInputStatus) return undefined;
    const { planId, ...rest } = planInputStatus;

    const resourceItems = getResourceInputStatusItems(rest);
    const resourceStatus = getOverallStatus(resourceItems);

    const analyticsItems = getAnalyticsInputStatusItems(rest);
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
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <InputCategoryCard
        icon={{ text: "🏢", color: "primary" }}
        title={INPUT_CATEGORY_LABELS.RESOURCE}
        inputSource="運航本部総括部・財務部"
        status={statuses.resource.status}
        description="自社が保有する人員や航空機などの資源量を基に、実現可能な運航計画を作成します。"
        listItems={statuses.resource.items}
        onClick={() => router.push(`/plan/${planId}/input/resource`)}
      />
      <InputCategoryCard
        icon={{ text: "📊", color: "purple" }}
        title={INPUT_CATEGORY_LABELS.ANALYTICS}
        inputSource="外部データ分析協力会社"
        status={statuses.analytics.status}
        description="過去の運航実績データや人気旅行先に関する需要を分析したデータを基に、収益性の高い運航計画を作成します。"
        listItems={statuses.analytics.items}
        onClick={() => router.push(`/plan/${planId}/input/analytics`)}
      />
      <InputCategoryCard
        icon={{ text: "🛫", color: "green" }}
        title={INPUT_CATEGORY_LABELS.AIRPORT}
        inputSource="連携空港"
        status={statuses.airport.status}
        description="連携空港の運航スケジュールに合わせ、可能な時間帯に運航を割り当てます。"
        listItems={[]}
        onClick={() => router.push(`/plan/${planId}/input/airport`)}
      />
    </div>
  );
}
