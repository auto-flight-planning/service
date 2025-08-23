"use client";

import { ButtonHTMLAttributes } from "react";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: "primary" | "gray";
  size?: "small" | "medium" | "large";
}

export default function SquareButton({
  text,
  onClick,
  color = "primary",
  size = "medium",
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

  const classes = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]}`;

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
}
