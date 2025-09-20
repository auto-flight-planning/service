import { ReactNode } from "react";
import {
  ALL_SIZE_OPTIONS,
  type AllSize,
  ALL_COLOR_OPTIONS,
  type AllColor,
  ALL_VARIANT_OPTIONS,
  type AllVariant,
  ALL_ROUNDED_OPTIONS,
  type AllRounded,
} from "@/constants/theme";

export interface ChipProps {
  text?: string;
  variant?: AllVariant;
  size?: Extract<AllSize, "xs" | "sm" | "md">;
  color?: Extract<
    AllColor,
    "primary" | "red" | "green" | "yellow" | "gray" | "light-gray"
  >;
  rounded?: Extract<AllRounded, "full" | "md">;
  children?: ReactNode;
  className?: string;
}

export default function Chip({
  text,
  variant = ALL_VARIANT_OPTIONS.SOLID,
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.PRIMARY,
  rounded = ALL_ROUNDED_OPTIONS.FULL,
  children,
  className = "",
}: ChipProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        ${sizeStyles[size]}
        ${colorStyles[variant][color]}
        rounded-${rounded}
        transition-colors
        duration-300
        ${className}
      `}
    >
      {text && <span>{text}</span>}
      {children}
    </div>
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.XS]: "px-1.5 py-0.75 text-[10px]",
  [ALL_SIZE_OPTIONS.SM]: "px-2.5 py-1.5 text-xs",
  [ALL_SIZE_OPTIONS.MD]: "px-3 py-1.5 text-sm",
};

const colorStyles = {
  [ALL_VARIANT_OPTIONS.OUTLINE]: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "border border-primary-400 bg-white text-primary-400",
    [ALL_COLOR_OPTIONS.RED]: "border border-red-400 bg-white text-red-400",
    [ALL_COLOR_OPTIONS.GREEN]:
      "border border-green-500 bg-white text-green-500",
    [ALL_COLOR_OPTIONS.YELLOW]:
      "border border-yellow-500 bg-white text-yellow-500",
    [ALL_COLOR_OPTIONS.GRAY]: "border border-gray-500 bg-white text-gray-500",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "border border-gray-400 bg-white text-gray-400",
  },
  [ALL_VARIANT_OPTIONS.SOLID]: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "border border-primary-400 bg-primary-400 text-white",
    [ALL_COLOR_OPTIONS.RED]: "border border-red-400 bg-red-400 text-white",
    [ALL_COLOR_OPTIONS.GREEN]:
      "border border-green-500 bg-green-500 text-white",
    [ALL_COLOR_OPTIONS.YELLOW]:
      "border border-yellow-400 bg-yellow-400 text-white",
    [ALL_COLOR_OPTIONS.GRAY]:
      "border border-gray-300 bg-gray-300 text-gray-600",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "border border-gray-200 bg-gray-200 text-gray-500",
  },
};
