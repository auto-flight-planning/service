import { InputHeader } from "@/features/plan/input";

export default function AirportInputPage() {
  return (
    <div className="flex flex-col gap-4">
      <InputHeader
        title="連携空港の運航スケジュールデータ"
        description="各連携空港へ運航スケジュールデータを依頼"
      />
    </div>
  );
}
