import { FieldWrapper, Select } from "@/components/form";
import { TextField } from "@/components/form";
import { useCreatePlan } from "@/features/plan/base/create";
import { getYearOptions } from "../createPlanutils";
import AddParticipants from "./addParticipants";

export default function CreatePlanForm() {
  const {
    formMethods,
    dateProps: { monthOptions, onYearChange },
  } = useCreatePlan();
  const {
    formState: { errors },
  } = formMethods;

  return (
    <div className="flex flex-col gap-4">
      <TextField
        name="planName"
        label="企画名"
        placeholder="企画名を入力してください"
      />
      <FieldWrapper
        label="対象期間"
        error={errors.year?.message || errors.month?.message}
        onErrorMsg={false}
      >
        <div className="flex flex-col">
          <div className="flex gap-4 w-full">
            <Select
              name="year"
              placeholder="対象年を選択してください"
              options={getYearOptions()}
              onCustomChange={onYearChange}
            />
            <Select
              name="month"
              placeholder="対象月を選択してください"
              options={monthOptions}
            />
          </div>
        </div>
      </FieldWrapper>
      <AddParticipants />
    </div>
  );
}
