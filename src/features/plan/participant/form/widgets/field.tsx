import { useFormContext } from "react-hook-form";
import useSearch from "../hooks/useSearch";
import useHandle from "../hooks/useHandle";
import { TextField } from "@/components/input";
import SearchResult from "../components/searchResult";
import SelectedParticipantDetail from "../../components/selectedParticipantDetail";
import { type ParticipantsFieldSchema } from "../schemas/form.schema";

export default function ParticipantsField() {
  const { control } = useFormContext<{
    participants: ParticipantsFieldSchema;
  }>();

  const {
    useSearhName: { searchName, setSearchName },
    useIsFocused: { isFocused, handleFocus, handleBlur },
    employees,
    isFetching,
  } = useSearch(control);

  const {
    selectedParticipants,
    addParticipant,
    toggleParticipantPermission,
    removeParticipant,
  } = useHandle(control);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <TextField
          label="計画参加者"
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
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[225px] scrollbar-custom">
        {selectedParticipants.map((participant, index) => (
          <SelectedParticipantDetail
            type="edit"
            key={participant.userId}
            userId={participant.userId}
            participantIndex={index}
            fullName={`${participant.lastName} ${participant.firstName}`}
            email={participant.email}
            permission={participant.permission}
            onTogglePermission={toggleParticipantPermission}
            onRemove={removeParticipant}
          />
        ))}
      </div>
    </div>
  );
}
