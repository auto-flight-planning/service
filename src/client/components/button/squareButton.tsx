"use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/client/components/spinner";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bold?: boolean;
  color?: "primary" | "gray" | "light-gray";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  isPending?: boolean;
  onBorder?: boolean;
}

export default function SquareButton({
  text,
  bold = false,
  onClick,
  color = "primary",
  size = "medium",
  fullWidth = false,
  isPending = false,
  onBorder = false,
  ...props
}: SquareButtonProps) {
  const baseClasses = onBorder
    ? "rounded-md font-medium transition-all duration-200 border"
    : "rounded-md font-medium transition-all duration-200 border-none";

  const colorClasses = {
    primary: onBorder
      ? "bg-primary-500 hover:bg-primary-600 text-white border-primary-400 hover:border-primary-500 disabled:bg-primary-700 disabled:text-gray-200 disabled:border-primary-600"
      : "bg-primary-500 hover:bg-primary-600 text-white disabled:bg-primary-700 disabled:text-gray-200",
    gray: onBorder
      ? "bg-gray-300 hover:bg-gray-400 text-gray-700 border-gray-400 hover:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300"
      : "bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 disabled:text-gray-400",
    "light-gray": onBorder
      ? "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200"
      : "bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:bg-gray-50 disabled:text-gray-300",
  };

  const interactionClasses =
    "cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100";

  const sizeClasses = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const spinnerSizes = {
    small: "sm" as const,
    medium: "sm" as const,
    large: "md" as const,
  };

  const spinnerColors = {
    primary: "white" as const,
    gray: "gray" as const,
    "light-gray": "gray" as const,
  };

  const classes =
    `${baseClasses} ${colorClasses[color]} ${interactionClasses} ${sizeClasses[size]} ${widthClasses}`.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={isPending || props.disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isPending && (
          <Spinner size={spinnerSizes[size]} color={spinnerColors[color]} />
        )}
        <span className={bold ? "font-semibold" : ""}>{text}</span>
      </div>
    </button>
  );
}
