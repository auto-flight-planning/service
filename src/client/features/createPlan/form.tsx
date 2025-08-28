import { FormProvider } from "react-hook-form";
import { useCreatePlan } from ".";
import { FieldWrapper, Select, TextField } from "@/client/components/form";
import { getYearOptions } from "./utils";

export default function CreatePlanForm() {
  const {
    formMethods,
    dateProps: { monthOptions, onYearChange },
  } = useCreatePlan();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(() => {})}>
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
      </form>
    </FormProvider>
  );
}
