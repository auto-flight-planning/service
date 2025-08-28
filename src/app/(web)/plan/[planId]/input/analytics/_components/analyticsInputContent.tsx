"use client";

import { useState } from "react";
import { SquareButton } from "@/client/components/button";
import { PointCard } from "@/client/components/card";
import DataInputCard from "../../_components/dataInputCard";

interface AnalyticsInputContentProps {
  planId: string;
}

export default function AnalyticsInputContent({
  planId,
}: AnalyticsInputContentProps) {
  const [isDirectInput, setIsDirectInput] = useState(false);

  const dataItems = [
    {
      number: 1,
      title: "運航候補別の最適収益・優先順位データ",
      items: [
        "日付",
        "出発地",
        "到着地",
        "飛行時間",
        "推奨最大運航数",
        "出発時刻",
        "最適収益時点データ",
      ],
      isCompleted: false,
    },
    {
      number: 2,
      title: "往復運航優先順位指数正規化関数",
      items: [],
      isCompleted: false,
    },
    {
      number: 3,
      title: "運航最小配分基準",
      items: ["出発地", "到着地", "最低維持日別運航回数"],
      isCompleted: false,
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
              <h3 className="font-bold text-gray-900">データ入力要請</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              外部データ分析協力会社に運航日程企画のための分析データの入力を要請してください。
              <br />
              協力会社が専用フォームを通じてデータを入力すると、このページで確認できるようになります。
            </p>
            <div>
              <SquareButton
                text="入力要請を送信"
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
