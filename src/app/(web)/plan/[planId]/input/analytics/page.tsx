import { InputHeader } from "@/features/plan/input";
import { AnalyticsInputContainer } from "@/features/plan/input/analytics";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{
    planId: string;
  }>;
}) {
  const { planId } = await params;
  return (
    <div className="flex flex-col gap-8">
      <InputHeader
        title="運航計画のための分析データ"
        description="外部データ分析協力会社へデータを依頼"
      />
      <AnalyticsInputContainer planId={planId} />
    </div>
  );
}
