import InputHeader from "../_components/inputHeader";

export default function AnalyticsInputPage() {
  return (
    <div className="flex flex-col gap-4">
      <InputHeader
        title="運航日程企画のための分析データ"
        description="外部データ分析協力会社にデータを依頼"
      />
    </div>
  );
}
