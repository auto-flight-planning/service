import InputHeader from "../_components/inputHeader";
import AnalyticsInputContent from "./_components/analyticsInputContent";

interface AnalyticsPageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { planId } = await params;

  return (
    <div className="flex flex-col gap-8">
      <InputHeader
        title="運航日程企画のための分析データ"
        description="外部データ分析協力会社にデータを依頼"
      />
      <AnalyticsInputContent planId={planId} />
    </div>
  );
}
