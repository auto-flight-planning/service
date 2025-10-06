import { useCheckPermission } from "@/features/plan/participant";
import { BasicModalFooter } from "@/features/modal";
import useInputModalTypeStore from "../stores/inputModalTypeStore";

export default function InputFormWrapper({
  onSubmit,
  isPending,
  children,
}: {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
  children: React.ReactNode;
}) {
  const { inputModalType, setInputModalType } = useInputModalTypeStore();
  const hasPermission = useCheckPermission("INPUT");

  return (
    <form
      className="flex flex-col justify-between p-6 h-full"
      onSubmit={onSubmit}
    >
      {children}
      {hasPermission && (
        <BasicModalFooter
          cancelProps={{
            hidden: true,
          }}
          confirmProps={
            inputModalType === "view"
              ? {
                  text: "編集",
                  onClick: () => setInputModalType("edit"),
                }
              : {
                  text: "保存",
                  onClick: onSubmit,
                  disabled: isPending,
                  isLoading: isPending,
                }
          }
          explanationText={
            inputModalType === "view"
              ? ""
              : "保存すると計画の参加者に通知が自動送信されます"
          }
        />
      )}
    </form>
  );
}
