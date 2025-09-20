import { useState } from "react";
import { BackButton, SquareButton } from "@/components/button";
import InputSubCategoryCard, {
  InputSubCategoryCardProps,
} from "../components/inputSubCategoryCard";
import { PointCard } from "@/components/card";

interface CategoryProps {
  inputItems: InputSubCategoryCardProps[];
  mailContainerMessage: string;
  onClickSendMail: () => void;
}

export default function InputContainer({
  categoryProps: { inputItems, mailContainerMessage, onClickSendMail },
}: {
  categoryProps: CategoryProps;
}) {
  // TODO: 외부 입력자 시점 추가
  const [mode, setMode] = useState("view");

  return (
    <section className="flex flex-col gap-8 bg-white p-8 rounded-xl shadow-md mb-8">
      {/* Header */}
      <header className="flex items-center gap-4 mb-2">
        {mode === "input" && <BackButton onClick={() => setMode("view")} />}
        <h4 className="text-xl font-bold text-gray-700">
          データ入力{mode === "input" ? "状況" : ""}
        </h4>
        {mode === "view" && (
          <SquareButton
            text="直接入力"
            color="light-gray"
            size="md"
            onBorder
            onClick={() => setMode("input")}
          />
        )}
      </header>

      {/* Input Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {inputItems.map((item) => (
          <InputSubCategoryCard key={item.title} {...item} />
        ))}
      </section>

      {/* 案内 */}
      {mode === "input" ? (
        <PointCard
          color="primary"
          onBorder
          onPointBorder
          background="light"
          onShadow={false}
        >
          <p className="text-sm text-primary-500 font-semibold">
            📝 各項目をクリックすると、詳細説明を確認し、入力や修正ができます。
          </p>
        </PointCard>
      ) : (
        <PointCard
          color="light-gray"
          onBorder
          background="light"
          onShadow={false}
        >
          <p className="text-sm text-gray-700">
            📋 各項目をクリックすると、詳細説明と入力データを確認できます。
          </p>
        </PointCard>
      )}

      {/* データ入力依頼 */}
      {mode === "view" && (
        <PointCard
          color="primary"
          onBorder
          onPointBorder={false}
          background="light"
          onShadow={false}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-primary-500">📧</span>
              <h3 className="font-bold text-gray-900">データ入力依頼</h3>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-3">
              {mailContainerMessage}
            </p>
            <div>
              <SquareButton
                text="依頼を送信"
                color="primary"
                size="md"
                onClick={onClickSendMail}
              />
            </div>
          </div>
        </PointCard>
      )}
    </section>
  );
}
