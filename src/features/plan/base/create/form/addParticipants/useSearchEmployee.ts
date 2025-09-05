import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/features/auth";

export interface EmployeeResult {
  employeeId: string;
  userId: string;
  lastName: string;
  firstName: string;
}

interface SearchEmployeeResponse {
  employees: EmployeeResult[];
}

export default function useSearchEmployee(searchName: string) {
  const { user } = useUserStore();

  const { data, isPending, error } = useQuery({
    queryKey: ["searchEmployee", searchName],
    queryFn: async (): Promise<SearchEmployeeResponse> => {
      if (!searchName.trim()) {
        return { employees: [] };
      }

      const response = await fetch(
        `/api/user/search-employee?searchName=${encodeURIComponent(searchName)}`
      );

      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      return response.json();
    },
    enabled: searchName.trim().length > 0,
  });

  const filteredEmployees =
    data?.employees.filter(
      (employee) => employee.employeeId !== user?.employeeId
    ) || [];

  return {
    employees: filteredEmployees,
    isPending,
    error,
  };
}
