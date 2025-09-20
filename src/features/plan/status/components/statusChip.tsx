import {
  ALL_SIZE_OPTIONS,
  type AllSize,
  ALL_COLOR_OPTIONS,
  type AllColor,
} from "@/constants/theme";

interface StatusChipProps {
  text: string;
  size?: Extract<AllSize, "md" | "sm">;
  color: Extract<AllColor, "primary" | "green" | "yellow" | "light-gray">;
  showDot?: boolean;
  onBorder?: boolean;
  className?: string;
}

export default function StatusChip({
  text,
  size = ALL_SIZE_OPTIONS.MD,
  color,
  showDot = true,
  onBorder = false,
  className = "",
}: StatusChipProps) {
  return (
    <div
      className={`${colorStyles[color]} ${sizeStyles[size]} ${className} ${
        onBorder ? "border " : ""
      }`}
    >
      {showDot && <div className="w-2 h-2 bg-current rounded-full"></div>}
      {text && <span>{text}</span>}
    </div>
  );
}

const colorStyles = {
  [ALL_COLOR_OPTIONS.PRIMARY]:
    "bg-primary-500/10 text-primary-500 border-primary-500",
  [ALL_COLOR_OPTIONS.GREEN]: "bg-green-500/10 text-green-500 border-green-500",
  [ALL_COLOR_OPTIONS.YELLOW]:
    "bg-yellow-500/10 text-yellow-500 border-yellow-500",
  [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
    "bg-gray-100 text-gray-500 border-gray-300",
};

const sizeStyles = {
  [ALL_SIZE_OPTIONS.MD]:
    "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2",
  [ALL_SIZE_OPTIONS.SM]:
    "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-2",
};
