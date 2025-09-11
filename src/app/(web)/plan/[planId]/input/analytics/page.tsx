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
        title="運航日程企画のための分析データ"
        description="外部データ分析協力会社にデータを依頼します"
      />
      <AnalyticsInputContainer planId={planId} />
    </div>
  );
}
