"use client";

import { useState } from "react";
import { SquareButton } from "@/client/components/button";
import { PointCard } from "@/client/components/card";
import DataInputCard from "../../_components/dataInputCard";

interface ResourceInputContentProps {
  planId: string;
}

export default function ResourceInputContent({
  planId,
}: ResourceInputContentProps) {
  const [isDirectInput, setIsDirectInput] = useState(false);
  const dataItems = [
    {
      number: 1,
      title: "総人員データ",
      items: ["機長・副操縦士人数", "その他総人員指数"],
      isCompleted: true, // 완료 상태
    },
    {
      number: 2,
      title: "運航規模の種類",
      items: ["自社保有の航空機に応じた運航規模区分"],
      isCompleted: true, // 완료 상태
    },
    {
      number: 3,
      title: "運航規模別データ",
      items: [
        "総航空機数",
        "最小待機航空機数",
        "座席数",
        "必要人員データ",
        "運航可能最小収益",
        "飛行前後に必要な時間",
      ],
      isCompleted: false, // 미완료 상태
    },
  ];

  return (
    <div className="flex flex-col gap-8 bg-white p-8 rounded-xl shadow-md mb-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h4 className="text-xl font-bold text-gray-700">データ入力状況</h4>
          <SquareButton
            text="直接入力"
            color="light-gray"
            size="medium"
            onBorder
            onClick={() => setIsDirectInput(!isDirectInput)}
          />
        </div>
      </div>

      {/* 데이터 입력 카드들 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dataItems.map((item) => (
          <DataInputCard
            key={item.number}
            number={item.number}
            title={item.title}
            items={item.items}
            isCompleted={item.isCompleted}
            onClick={() => console.log(`${item.title} 클릭`)}
          />
        ))}
      </div>

      {/* 안내 메시지 */}
      <PointCard
        color={isDirectInput ? "primary" : "gray"}
        onPointBorder
        background={isDirectInput ? "light" : "white"}
      >
        <p
          className={`text-sm ${
            isDirectInput ? "text-primary-500 font-semibold" : "text-gray-700"
          }`}
        >
          {isDirectInput
            ? "📝 各項目をクリックすると詳細説明の確認と入力/修正が可能です"
            : "📋 各項目をクリックすると詳細説明と入力データを確認できます"}
        </p>
      </PointCard>

      {/* 데이터 입력 요청 섹션 - 직접입력 모드가 아닐 때만 표시 */}
      {!isDirectInput && (
        <PointCard color="primary" onPointBorder>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-primary-500">📧</span>
              <h3 className="font-bold text-gray-900">データ入力依頼</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              運航本部総括部と財務部に自社資源データの入力を依頼してください。
              <br />
              各部署が専用フォームを通じてデータを入力すると、このページで確認できるようになります。
            </p>
            <div>
              <SquareButton
                text="入力依頼を送信"
                color="primary"
                size="medium"
                onClick={() => console.log("입력 요청 전송")}
              />
            </div>
          </div>
        </PointCard>
      )}
    </div>
  );
}
