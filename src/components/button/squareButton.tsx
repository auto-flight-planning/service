"use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/components/spinner";
import {
  ALL_SIZE_OPTIONS,
  type AllSize,
  ALL_COLOR_OPTIONS,
  type AllColor,
} from "@/constants/theme";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bold?: boolean;
  size?: Extract<AllSize, "sm" | "md" | "lg">;
  color?: Extract<AllColor, "primary" | "gray" | "light-gray">;
  fullWidth?: boolean;
  isLoading?: boolean;
  onBorder?: boolean;
}

export default function SquareButton({
  text,
  bold = false,
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.PRIMARY,
  fullWidth = false,
  isLoading = false,
  onBorder = false,
  onClick,
  ...props
}: SquareButtonProps) {
  const baseStyles = onBorder
    ? "rounded-md font-medium transition-all duration-200 border"
    : "rounded-md font-medium transition-all duration-200 border-none";

  const widthStyles = fullWidth ? "w-full" : "min-w-fit";

  const styles = `${baseStyles} ${
    colorStyles[onBorder ? "onBorder" : "offBorder"][color]
  } ${interactionStyles} ${sizeStyles[size]} ${widthStyles}`.trim();

  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <Spinner
            size={size}
            color={
              color === ALL_COLOR_OPTIONS.PRIMARY
                ? ALL_COLOR_OPTIONS.WHITE
                : ALL_COLOR_OPTIONS.GRAY
            }
          />
        )}
        <span className={bold ? "font-semibold" : ""}>{text}</span>
      </div>
    </button>
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.SM]: "px-3 py-1.5 text-xs",
  [ALL_SIZE_OPTIONS.MD]: "px-4 py-2 text-sm",
  [ALL_SIZE_OPTIONS.LG]: "px-6 py-3 text-base",
};

const colorStyles = {
  onBorder: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "bg-primary-500 hover:bg-primary-600 text-white border-primary-400 hover:border-primary-500 disabled:bg-primary-700 disabled:text-gray-200 disabled:border-primary-600",
    [ALL_COLOR_OPTIONS.GRAY]:
      "bg-gray-300 hover:bg-gray-400 text-gray-700 border-gray-400 hover:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200",
  },
  offBorder: {
    [ALL_COLOR_OPTIONS.PRIMARY]:
      "bg-primary-500 hover:bg-primary-600 text-white disabled:bg-primary-700 disabled:text-gray-200",
    [ALL_COLOR_OPTIONS.GRAY]:
      "bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 disabled:text-gray-400",
    [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
      "bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:bg-gray-50 disabled:text-gray-300",
  },
};

const interactionStyles =
  "cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100";
