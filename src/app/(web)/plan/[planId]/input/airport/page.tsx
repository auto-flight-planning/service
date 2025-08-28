import InputHeader from "../_components/inputHeader";

export default function AirportInputPage() {
  return (
    <div className="flex flex-col gap-4">
      <InputHeader
        title="連携空港の運航日程データ"
        description="各連携空港に運航日程データを依頼"
      />
    </div>
  );
}
