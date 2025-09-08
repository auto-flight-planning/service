import { TextField } from "@/components/input";
import useSearchParticipant from "../hooks/useSearchParticipant";

export default function ParticipantsField() {
  const {
    useSearhNameState: { searchName, setSearchName },
    employees,
    isPending,
    error,
  } = useSearchParticipant();

  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="企画参加者"
        placeholder="検索する氏名を入力してください"
        value={searchName}
        onChange={setSearchName}
      />
    </div>
  );
}
