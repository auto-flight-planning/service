import WhiteCard from "@/components/card/whiteCard";
import Chip from "@/components/chip/chip";
import {
  StatusChip,
  StatusChipColor,
  ListItemStatus,
} from "@/features/plan/status";
import { ListDataItem, StatusEnum } from "@/features/plan/status/type";
import { getStatusChipProps } from "@/features/plan/status/utils";

export enum IconColor {
  PRIMARY = "primary",
  PURPLE = "purple",
  GREEN = "green",
}

const iconBgStyles = {
  primary: "from-primary-500 to-primary-600",
  purple: "from-purple-600 to-purple-700",
  green: "from-green-500 to-green-600",
};

const statusChipProps = getStatusChipProps("medium");

export default function InputCategoryCard({
  icon,
  title,
  inputSource,
  status,
  description,
  listItems,
  onClick,
}: {
  icon: { text: string; color: IconColor };
  title: string;
  description: string;
  inputSource: string;
  status: StatusEnum;
  listItems: ListDataItem[];
  onClick: () => void;
}) {
  return (
    <WhiteCard onClick={onClick}>
      {/* Status Chip */}
      <div className="absolute top-5 right-5">
        <StatusChip
          text={statusChipProps[status].text}
          color={statusChipProps[status].color as StatusChipColor}
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-14 h-14 bg-gradient-to-r ${
            iconBgStyles[icon.color]
          } rounded-lg flex items-center justify-center text-white text-2xl font-bold`}
        >
          {icon.text}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center gap-2">
            <Chip
              text="入力者"
              color="light-gray"
              size="extra-small"
              rounded="md"
            />
            <p className="text-sm text-gray-600">{inputSource}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* List Items */}
      {listItems.length > 0 && (
        <ul className="space-y-2">
          {listItems.map((item, index) => (
            <ListItemStatus key={index} index={index} item={item} />
          ))}
        </ul>
      )}
    </WhiteCard>
  );
}
