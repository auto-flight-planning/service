import useSearch from "../hooks/useSearch";
import useHandle from "../hooks/useHandle";
import { TextField } from "@/components/input";
import SearchResult from "../components/searchResult";

export default function ParticipantsField() {
  const {
    useSearhName: { searchName, setSearchName },
    useIsFocused: { isFocused, handleFocus, handleBlur },
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
    <div className="flex flex-col gap-2">
      <div>
        <TextField
          label="企画参加者"
          placeholder="検索する氏名を入力してください"
          value={searchName}
          onChange={setSearchName}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && (
          <SearchResult
            employees={employees}
            isSearching={!!searchName}
            isLoading={isFetching}
            onSelect={addParticipant}
          />
        )}
      </div>
    </div>
  );
}
