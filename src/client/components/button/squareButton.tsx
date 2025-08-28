"use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@/client/components/spinner";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: "primary" | "gray";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  isPending?: boolean;
}

export default function SquareButton({
  text,
  onClick,
  color = "primary",
  size = "medium",
  fullWidth = false,
  isPending = false,
  ...props
}: SquareButtonProps) {
  const baseClasses =
    "rounded-md font-medium transition-all duration-200 cursor-pointer border-none active:scale-95";

  const colorClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    gray: "bg-gray-300 hover:bg-gray-400 text-gray-700",
  };

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
  };

  const classes =
    `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${widthClasses}`.trim();

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
        <span>{text}</span>
      </div>
    </button>
  );
}
