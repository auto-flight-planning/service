import { useState, useDeferredValue } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TextField } from "@/components/input";
import { Chip } from "@/components/chip";
import useSearchEmployee, { EmployeeResult } from "./useSearchEmployee";
import EmployeeSearchResults from "./employeeSearchResults";

export default function AddParticipants() {
  const { control, setValue } = useFormContext();
  const selectedEmployees = useWatch({
    control,
    name: "participants",
  });

  const [searchName, setSearchName] = useState("");
  const deferredSearchName = useDeferredValue(searchName);
  const { employees, isPending } = useSearchEmployee(deferredSearchName);
  const filteredEmployees = employees.filter(
    (employee) =>
      !selectedEmployees.some(
        (e: EmployeeResult) => e.userId === employee.userId
      )
  );

  const handleEmployeeSelect = (employee: EmployeeResult) => {
    setValue("participants", [...selectedEmployees, employee]);
  };

  const handleEmployeeRemove = (userId: string) => {
    const updatedEmployees = selectedEmployees.filter(
      (emp: EmployeeResult) => emp.userId !== userId
    );
    setValue("participants", updatedEmployees);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <TextField
          label="企画参加者"
          placeholder="検索する氏名を入力してください"
          value={searchName}
          onChange={setSearchName}
        />

        <EmployeeSearchResults
          employees={filteredEmployees}
          isPending={isPending}
          searchName={deferredSearchName}
          onSelect={handleEmployeeSelect}
        />
      </div>

      {selectedEmployees && selectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedEmployees.map((employee: EmployeeResult) => (
            <Chip
              key={employee.userId}
              onRemove={() => handleEmployeeRemove(employee.userId)}
            >
              <span className="text-xs font-medium text-gray-700">
                {employee.lastName} {employee.firstName}
              </span>
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}
