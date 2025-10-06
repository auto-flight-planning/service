import { useFormContext } from "react-hook-form";
import useInputModalTypeStore from "../../../stores/inputModalTypeStore";
import useWorkforceForm from "../hooks/useWorkforceForm";
import InputFormWrapper from "../../../widgets/inputFormWrapper";
import { NumberField } from "@/components/form";
import { WorkforceFormData } from "../schemas/formSchema";

export default function WorkforceForm() {
  const { inputModalType } = useInputModalTypeStore();

  const { handleSubmit } = useFormContext<WorkforceFormData>();
  const { onValidSubmit, isPending } = useWorkforceForm();
  const onSubmit = handleSubmit(onValidSubmit);

  return (
    <InputFormWrapper onSubmit={onSubmit} isPending={isPending}>
      <section className="space-y-8">
        <div className="flex gap-4 w-full">
          <NumberField
            name="captainCnt"
            label="機長の人数"
            placeholder={
              inputModalType === "view"
                ? "まだ入力されていません"
                : "機長の人数を入力してください"
            }
            unit="人"
            onUnit
            disabled={inputModalType === "view"}
          />
          <NumberField
            name="subCaptainCnt"
            label="副操縦士の人数"
            placeholder={
              inputModalType === "view"
                ? "まだ入力されていません"
                : "副操縦士の人数を入力してください"
            }
            unit="人"
            onUnit
            disabled={inputModalType === "view"}
          />
        </div>
        <NumberField
          name="otherPersonnelNorm"
          label="その他総人員指数"
          placeholder={
            inputModalType === "view"
              ? "まだ入力されていません"
              : "その他総人員指数を入力してください"
          }
          disabled={inputModalType === "view"}
        />
      </section>
    </InputFormWrapper>
  );
}
