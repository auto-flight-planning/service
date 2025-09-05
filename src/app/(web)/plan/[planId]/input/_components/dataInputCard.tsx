"use client";

import { WhiteCard } from "@/components/card";
import { StatusChip } from "@/components/chip";

interface DataInputCardProps {
  number: number;
  title: string;
  items: string[];
  isCompleted?: boolean;
  onClick?: () => void;
}

export default function DataInputCard({
  number,
  title,
  items,
  isCompleted = false,
  onClick,
}: DataInputCardProps) {
  return (
    <WhiteCard onClick={onClick} onBorder>
      {/* 완료 칩 */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <StatusChip text="完了" color="primary" showDot />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* 번호 */}
        <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {number}
        </div>

        {/* 내용 */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start gap-2"
              >
                <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WhiteCard>
  );
}
