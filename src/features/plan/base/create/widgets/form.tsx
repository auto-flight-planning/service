import useCreatePlan from "../hooks/useCreatePlan";
import useHandleTargetDate from "../hooks/useHandleTargetDate";
import { TextField, FieldWrapper, Select } from "@/components/form";
import { getYearOptions } from "../utils";
import { ParticipantsField } from "@/features/plan/participant";

export default function CreatePlanForm() {
  const { formMethods } = useCreatePlan();
  const { monthOptions, onYearChange } = useHandleTargetDate();

  const {
    formState: { errors },
  } = formMethods;
  const targetDateError = errors.year?.message || errors.month?.message;

  return (
    <div className="flex flex-col gap-4">
      <TextField
        name="title"
        label="計画名"
        placeholder="計画名を入力してください"
      />
      <FieldWrapper label="対象期間" error={targetDateError} onErrorMsg={false}>
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
      <ParticipantsField />
    </div>
  );
}
