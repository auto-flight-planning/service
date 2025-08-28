"use client";

import { useGetPlanInfo } from "@/client/features/plan/get/useGetPlanInfo";
import DataCategoryCard from "./dataCategoryCard";
import { inputStatusExampleDummy } from "@/client/inputStatusDummy";
import { useRouter } from "next/navigation";

interface DataCategoriesSectionProps {
  planId: string;
}

export default function DataCategoriesSection({
  planId,
}: DataCategoriesSectionProps) {
  const { data, isPending, error } = useGetPlanInfo(planId);
  const router = useRouter();

  if (isPending || !data) {
    return null;
  }

  const inputStatus = data.status
    .input_status as typeof inputStatusExampleDummy;
  const _inputStatus = inputStatusExampleDummy;

  // 첫 번째 카테고리: 자사자원 데이터
  const resourceItems = [
    {
      label: "総人員データ",
      status: inputStatus.resource_data?.total_person_resource_data || "empty",
    },
    {
      label: "運航規模の種類",
      status: inputStatus.resource_data?.flight_scale_data || "empty",
    },
    {
      label: "運航規模別データ",
      status: inputStatus.resource_data?.per_flight_scale_data || "empty",
    },
  ];

  // 두 번째 카테고리: 분석 데이터
  const analyticsItems = [
    {
      label: "運航候補別の最適収益・優先順位データ",
      status: inputStatus.analytics_data?.candidate_data || "empty",
    },
    {
      label: "往復運航優先順位指数正規化関数",
      status:
        inputStatus.analytics_data?.round_trip_normalization_func || "empty",
    },
    {
      label: "運航最小配分基準",
      status:
        inputStatus.analytics_data?.route_min_distribution_data || "empty",
    },
  ];

  // 세 번째 카테고리: 공항 데이터 (상태만 추출)
  const airportStatuses = inputStatus.airport_data
    ? Object.values(inputStatus.airport_data)
    : [];

  // 상태 칩 계산 (아이템 배열용)
  const getOverallStatus = (items: any[]) => {
    if (items.length === 0) return "not_started";

    const allSubmitted = items.every((item) => item.status === "submitted");
    const hasInputting = items.some((item) => item.status === "inputting");
    const allEmpty = items.every((item) => item.status === "empty");

    if (allSubmitted) return "completed";
    if (hasInputting) return "inputting";
    if (allEmpty) return "not_started";
    return "inputting"; // 혼재 상태는 입력중으로 처리
  };

  // 상태 칩 계산 (상태 배열용 - 공항 데이터)
  const getOverallStatusFromStatuses = (statuses: string[]) => {
    if (statuses.length === 0) return "not_started";

    const allSubmitted = statuses.every((status) => status === "submitted");
    const hasInputting = statuses.some((status) => status === "inputting");
    const allEmpty = statuses.every((status) => status === "empty");

    if (allSubmitted) return "completed";
    if (hasInputting) return "inputting";
    if (allEmpty) return "not_started";
    return "inputting"; // 혼재 상태는 입력중으로 처리
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 자사자원 데이터 */}
      <DataCategoryCard
        icon="🏢"
        title="自社資源データ"
        subtitle="運航本部総括部・財務部"
        description="自社が保有する人員・航空機などの資源を基盤として、最適な運航日程を配定します。"
        items={resourceItems}
        statusChip={getOverallStatus(resourceItems)}
        color="primary"
        onClick={() => router.push(`/plan/${planId}/input/resource`)}
      />

      {/* 분석 데이터 */}
      <DataCategoryCard
        icon="📊"
        title="運航日程企画のための分析データ"
        subtitle="外部データ分析協力会社"
        description="過去の運航実績データや人気旅行地の動向分析を活用し、高い収益が期待できる運航企画を策定します。"
        items={analyticsItems}
        statusChip={getOverallStatus(analyticsItems)}
        color="purple"
        onClick={() => router.push(`/plan/${planId}/input/analytics`)}
      />

      {/* 공항 스케줄 데이터 */}
      <DataCategoryCard
        icon="🛫"
        title="連携空港の運航日程データ"
        subtitle="連携空港"
        description="連携空港の配定可能な時間帯に効率的な運航日程を組み立てます。"
        items={[]} // UI에는 표시하지 않음
        statusChip={getOverallStatusFromStatuses(airportStatuses)}
        color="green"
        onClick={() => router.push(`/plan/${planId}/input/airport`)}
      />
    </div>
  );
}
