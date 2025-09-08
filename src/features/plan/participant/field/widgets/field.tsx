import useSearch from "../hooks/useSearch";
import useHandle from "../hooks/useHandle";
import { TextField } from "@/components/input";
import SearchResult from "../components/searchResult";

export default function ParticipantsField() {
  const {
    useSearhNameState: { searchName, setSearchName },
    employees,
    isFetching,
  } = useSearch();
  const {
    selectedParticipants,
    addParticipant,
    removeParticipant,
    updateParticipantPermission,
  } = useHandle();

  return (
    <div className="flex flex-col">
      <TextField
        label="企画参加者"
        placeholder="検索する氏名を入力してください"
        value={searchName}
        onChange={setSearchName}
      />
      <SearchResult
        employees={employees}
        isSearching={!!searchName}
        isLoading={isFetching}
        onSelect={addParticipant}
      />
    </div>
  );
}
