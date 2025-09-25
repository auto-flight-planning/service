import { useModalStore, NumberModalHeader, ModalTab } from "@/features/modal";
import WorkforceExplain from "./explain";

const tabs = [
  {
    id: "data-input",
    label: "データ入力",
    content: <></>,
  },
  {
    id: "detail",
    label: "詳細説明",
    content: <WorkforceExplain />,
  },
];

export default function WorkforceInputModal() {
  const { closeModal } = useModalStore();

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberModalHeader title="総人員データ" number={1} onClose={closeModal} />
      <ModalTab tabs={tabs} defaultTab="data-input" />
    </div>
  );
}
