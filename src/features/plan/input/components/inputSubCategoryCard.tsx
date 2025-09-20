"use client";

import { WhiteCard } from "@/components/card";
import StatusChip, {
  StatusChipSize,
} from "@/features/plan/status/components/statusChip";
import { type BasicStatus } from "@/features/plan/status/type";
import { getStatusChipProps } from "@/features/plan/status/utils";

const statusChipProps = getStatusChipProps("medium");

export interface InputSubCategoryCardProps {
  number: number;
  title: string;
  items: string[] | null;
  status: BasicStatus;
  onClick: () => void;
}

export default function InputSubCategoryCard({
  number,
  title,
  items,
  status,
  onClick,
}: InputSubCategoryCardProps) {
  return (
    <WhiteCard onClick={onClick} onBorder>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <StatusChip
          text={statusChipProps[status].text}
          color={statusChipProps[status].color}
          size={statusChipProps[status].size as StatusChipSize}
          onBorder
        />
      </div>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {number}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          {items && (
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
          )}
        </div>
      </div>
    </WhiteCard>
  );
}
