"use client";

import { WhiteCard } from "@/components/card";
import { StatusChip } from "@/components/chip";

type StatusChipType = "completed" | "inputting" | "not_started" | null;

interface DataItem {
  label: string;
  status: string;
}

interface DataCategoryCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  items: DataItem[];
  statusChip: StatusChipType;
  color: "primary" | "purple" | "green";
  onClick?: () => void;
}

const colorStyles = {
  primary: {
    iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
  },
  purple: {
    iconBg: "bg-gradient-to-br from-purple-600 to-purple-700",
  },
  green: {
    iconBg: "bg-gradient-to-br from-green-500 to-green-600",
  },
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "submitted":
      return <span className="text-green-500 font-bold">✓</span>;
    case "inputting":
      return <span className="text-primary-500 font-bold">⋯</span>;
    case "empty":
    default:
      return <span className="text-gray-300 font-bold">○</span>;
  }
};

// 공통 StatusChip 컴포넌트 사용으로 제거

export default function DataCategoryCard({
  icon,
  title,
  subtitle,
  description,
  items,
  statusChip,
  color,
  onClick,
}: DataCategoryCardProps) {
  const styles = colorStyles[color];

  return (
    <WhiteCard onClick={onClick}>
      {/* 상태 칩 */}
      {statusChip && (
        <div className="absolute top-5 right-5">
          {statusChip === "completed" && (
            <StatusChip text="完了" color="green" showDot />
          )}
          {statusChip === "inputting" && (
            <StatusChip text="入力中" color="yellow" showDot />
          )}
          {statusChip === "not_started" && (
            <StatusChip text="入力前" color="gray" showDot />
          )}
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-14 h-14 ${styles.iconBg} rounded-xl flex items-center justify-center text-white text-2xl font-bold`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      {/* 설명 */}
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* 아이템 리스트 */}
      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <span
                className={
                  item.status === "empty" ? "text-gray-400" : "text-gray-700"
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </WhiteCard>
  );
}
