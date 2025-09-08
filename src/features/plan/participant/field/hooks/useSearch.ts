import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchEmployeesByNameResSchema } from "@/features/employee/server/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";

export default function useSearchParticipant() {
  const [searchName, setSearchName] = useState("");
  const deferredSearchName = useDeferredValue(searchName);

  const { data: { employees } = { employees: [] }, isFetching } = useQuery({
    queryKey: ["searchParticipant", deferredSearchName],
    queryFn: () => searchParticipantAPI(deferredSearchName),
    enabled: deferredSearchName.length > 0,
    staleTime: 5 * 60 * 1000, // 5分
  });

  return {
    useSearhNameState: { searchName, setSearchName },
    employees,
    isFetching,
  };
}

export const searchParticipantAPI = async (searchName: string) => {
  try {
    const res = await fetch(
      `/api/employees/search?searchName=${encodeURIComponent(searchName)}`
    );
    if (!res.ok) {
      throw new Error(errorResToMessage(res, "GET /api/employees/search"));
    }

    const employees: SearchEmployeesByNameResSchema = await res.json();
    return employees;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
