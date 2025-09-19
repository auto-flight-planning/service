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
        title="連携空港の運航スケジュールデータ"
        description="各連携空港へ運航スケジュールデータを依頼"
      />
    </div>
  );
}
