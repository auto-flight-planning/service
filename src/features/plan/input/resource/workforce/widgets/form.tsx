import { useFormContext } from "react-hook-form";
import useWorkforceForm from "../hooks/useWorkforceForm";
import { NumberField } from "@/components/form";
import { BasicModalFooter } from "@/features/modal";
import { UseTypeState } from "../../../types";
import { useCheckPermission } from "@/features/plan/participant";
import { WorkforceFormData } from "../schemas/formSchema";

export default function WorkforceForm({
  useTypeState,
}: {
  useTypeState: UseTypeState;
}) {
  const [type, setType] = useTypeState;
  const hasPermission = useCheckPermission("INPUT");

  const { handleSubmit } = useFormContext<WorkforceFormData>();
  const { onValidSubmit, isPending } = useWorkforceForm();
  const onSubmit = handleSubmit(onValidSubmit);

  return (
    <form
      className="flex flex-col justify-between p-6 h-full"
      onSubmit={onSubmit}
    >
      <div className="space-y-8">
        <div className="flex gap-4 w-full">
          <NumberField
            name="captainCnt"
            label="機長の人数"
            placeholder={
              type === "view"
                ? "まだ入力されていません"
                : "機長の人数を入力してください"
            }
            unit="人"
            onUnit
            disabled={type === "view"}
          />
          <NumberField
            name="subCaptainCnt"
            label="副操縦士の人数"
            placeholder={
              type === "view"
                ? "まだ入力されていません"
                : "副操縦士の人数を入力してください"
            }
            unit="人"
            onUnit
            disabled={type === "view"}
          />
        </div>
        <NumberField
          name="otherPersonnelNorm"
          label="その他総人員指数"
          placeholder={
            type === "view"
              ? "まだ入力されていません"
              : "その他総人員指数を入力してください"
          }
          disabled={type === "view"}
        />
      </div>
      {hasPermission && (
        <BasicModalFooter
          cancelProps={{
            hidden: true,
          }}
          confirmProps={
            type === "view"
              ? {
                  text: "編集",
                  onClick: () => setType("edit"),
                }
              : {
                  text: "保存",
                  onClick: onSubmit,
                  disabled: isPending,
                  isLoading: isPending,
                }
          }
          explanationText={
            type === "view"
              ? ""
              : "保存すると計画の参加者に通知が自動送信されます"
          }
        />
      )}
    </form>
  );
}
