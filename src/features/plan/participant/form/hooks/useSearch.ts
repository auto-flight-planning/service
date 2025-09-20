"use client";

import { useDeferredValue, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { type SearchEmployeesByNameResSchema } from "@/features/employee/server/schemas/res.schema";
import { type ParticipantsFieldSchema } from "../schemas/form.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useSearchParticipant(
  control: Control<{
    participants: ParticipantsFieldSchema;
  }>
) {
  const [searchName, setSearchName] = useState("");
  const deferredSearchName = useDeferredValue(searchName);

  const { data: { employees } = { employees: [] }, isFetching } = useQuery({
    queryKey: ["searchParticipant", deferredSearchName],
    queryFn: () => searchParticipantAPI(deferredSearchName),
    enabled: deferredSearchName.length > 0,
    staleTime: 5 * 60 * 1000, // 5分
  });

  const selectedParticipants = useWatch({ control, name: "participants" });
  const filteredEmployees = employees.filter(
    (employee) =>
      !selectedParticipants.some(
        (participant) => participant.userId === employee.userId
      )
  );

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 50);
  };

  return {
    useSearhName: { searchName, setSearchName },
    useIsFocused: { isFocused, handleFocus, handleBlur },
    employees: filteredEmployees,
    isFetching,
  };
}

export const searchParticipantAPI = async (searchName: string) => {
  try {
    const res = await apiFetchJson<SearchEmployeesByNameResSchema>(
      `/api/employees/search?searchName=${encodeURIComponent(searchName)}`
    );
    const employees = camelcaseKeys(res, { deep: true });
    return employees;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
