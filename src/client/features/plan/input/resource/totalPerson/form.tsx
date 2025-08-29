import { NumberField } from "@/client/components/form";
import useTotalPersonResource from "./useTotalPersonResource";

interface TotalPersonFormProps {
  planId: string;
}

export default function TotalPersonForm({ planId }: TotalPersonFormProps) {
  const { formMethods, onValidSubmit } = useTotalPersonResource(planId);
  const { handleSubmit } = formMethods;

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <div className="flex gap-4 w-full">
        <NumberField
          name="pilot_cnt"
          label="機長の人数"
          placeholder="機長の人数を入力してください"
          unit="人"
          onUnit
        />
        <NumberField
          name="second_pilot_cnt"
          label="副操縦士の人数"
          placeholder="副操縦士の人数を入力してください"
          unit="人"
          onUnit
        />
      </div>
      <NumberField
        name="total_person_exponent"
        label="その他総人員指数"
        placeholder="その他総人員指数を入力してください"
      />
    </form>
  );
}
