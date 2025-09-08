import { Spinner } from "@/components/spinner";
import {
  type Employee,
  type Employees,
} from "@/features/employee/server/schemas/res.schema";

interface ParticipantSearchResultProps {
  employees: Employees;
  isSearching: boolean;
  isLoading: boolean;
  onSelect: (employee: Employee) => void;
}

export default function ParticipantSearchResult({
  employees,
  isSearching,
  isLoading,
  onSelect,
}: ParticipantSearchResultProps) {
  if (!isSearching) return null;
  return (
    <div className="mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
      {isLoading ? (
        <div className="px-4 py-3 text-center flex items-center justify-center gap-2">
          <Spinner size="sm" />
          <span className="text-sm text-gray-500">検索中...</span>
        </div>
      ) : employees.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          検索結果がありません
        </div>
      ) : (
        employees.map((employee) => (
          <div
            key={employee.userId}
            className="px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
            onClick={() => onSelect(employee)}
          >
            {employee.lastName} {employee.firstName}
          </div>
        ))
      )}
    </div>
  );
}
