"use client";

import { ReactNode } from "react";
import { Chip, type ChipProps } from "@/components/chip";
import {
  ALL_SIZE_OPTIONS,
  ALL_COLOR_OPTIONS,
  ALL_VARIANT_OPTIONS,
} from "@/constants/theme";

interface ChipButtonProps {
  text: string;
  size?: ChipProps["size"];
  color?: ChipProps["color"];
  variant?: ChipProps["variant"];
  disabled?: boolean;
  children?: ReactNode;
  onClick: () => void;
}

export default function ChipButton({
  text,
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.PRIMARY,
  variant = ALL_VARIANT_OPTIONS.OUTLINE,
  disabled = false,
  children,
  onClick,
}: ChipButtonProps) {
  const interactionStyles = `cursor-pointer ${hoverBgStyles[variant][color]} active:scale-95 transition-all duration-200`;

  return (
    <div
      role="button"
      onClick={disabled ? undefined : onClick}
      className={disabled ? "cursor-not-allowed" : ""}
    >
      <Chip
        text={text}
        variant={variant}
        size={size}
        color={color}
        className={disabled ? "" : interactionStyles}
      >
        {children}
      </Chip>
    </div>
  );
}

const hoverBgStyles = {
  [ALL_VARIANT_OPTIONS.OUTLINE]: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "hover:bg-gray-50 hover:border-primary-500 hover:text-primary-500",
    [ALL_COLOR_OPTIONS.RED]:
      "hover:bg-red-50 hover:border-red-500 hover:text-red-500",
    [ALL_COLOR_OPTIONS.GREEN]:
      "hover:bg-green-50 hover:border-green-600 hover:text-green-600",
    [ALL_COLOR_OPTIONS.YELLOW]:
      "hover:bg-yellow-50 hover:border-yellow-600 hover:text-yellow-600",
    [ALL_COLOR_OPTIONS.GRAY]:
      "hover:bg-gray-50 hover:border-gray-600 hover:text-gray-600",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "hover:bg-gray-50 hover:border-gray-500 hover:text-gray-500",
  },
  [ALL_VARIANT_OPTIONS.SOLID]: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "hover:bg-primary-500 hover:border-primary-500",
    [ALL_COLOR_OPTIONS.RED]: "hover:bg-red-500 hover:border-red-500",
    [ALL_COLOR_OPTIONS.GREEN]: "hover:bg-green-600 hover:border-green-600",
    [ALL_COLOR_OPTIONS.YELLOW]: "hover:bg-yellow-500 hover:border-yellow-500",
    [ALL_COLOR_OPTIONS.GRAY]:
      "hover:bg-gray-400 hover:border-gray-400 hover:text-gray-700",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "hover:bg-gray-300 hover:border-gray-300 hover:text-gray-600",
  },
};
