"use client";

import { ReactNode, useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface ModalTabProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export default function ModalTab({ tabs, defaultTab }: ModalTabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 hover:cursor-pointer hover:bg-gray-50 transition-colors ${
              activeTab === tab.id
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 - 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">
        {activeTabContent}
      </div>
    </div>
  );
}
