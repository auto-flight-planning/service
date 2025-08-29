"use client";

import { useModalStore } from "@/client/stores";
import {
  NumberedModalHeader,
  BasicModalFooter,
  ModalTab,
} from "@/client/components/modal";
import ResourceExplain from "./explain";

interface ResourceInputModalProps {
  planId?: string;
}

export default function ResourceInputModal({
  planId = "",
}: ResourceInputModalProps) {
  const { closeModal } = useModalStore();

  const tabs = [
    {
      id: "data-input",
      label: "データ入力",
      content: (
        <div className="space-y-6">
          {/* 데이터 입력 폼 컨텐츠가 들어갈 자리 */}
          <div className="text-gray-500 text-center py-8">
            데이터 입력 폼 컴포넌트가 들어갈 자리입니다
          </div>
        </div>
      ),
    },
    {
      id: "detail",
      label: "詳細説明",
      content: <ResourceExplain />,
    },
  ];

  return (
    <div className="w-[50rem] h-[40rem] max-h-[40rem] max-w-[50rem] flex flex-col justify-between">
      <NumberedModalHeader
        title="総人員データ"
        number={1}
        onClose={closeModal}
      />

      <ModalTab tabs={tabs} defaultTab="data-input" />

      <div className="px-4 pb-4 pt-2 border-t border-gray-200">
        <BasicModalFooter
          confirmText="保存"
          showCancel={false}
          leftText="保存すると企画部に自動で通知が送信されます"
          onConfirm={() => {
            console.log("保存 클릭");
            closeModal();
          }}
          onBorder={false}
        />
      </div>
    </div>
  );
}
