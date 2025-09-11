import { InputHeader } from "@/features/plan/input";

export default async function AirportInputPage({
  params,
}: {
  params: Promise<{
    planId: string;
  }>;
}) {
  const { planId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <InputHeader
        title="連携空港の運航日程データ"
        description="各連携空港に運航日程データを依頼します"
      />
    </div>
  );
}
