"use client";

import { ButtonHTMLAttributes } from "react";
import {
  ALL_SIZE_OPTIONS,
  type AllSize,
  ALL_VARIANT_OPTIONS,
  type AllVariant,
} from "@/constants/theme";

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: Extract<AllSize, "sm" | "md">;
  variant?: AllVariant;
}

export default function RoundButton({
  text,
  size = ALL_SIZE_OPTIONS.MD,
  variant = ALL_VARIANT_OPTIONS.OUTLINE,
  onClick,
  ...props
}: RoundButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-full font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.SM]: "text-xs px-2.5 py-1.5",
  [ALL_SIZE_OPTIONS.MD]: "text-sm px-4 py-2",
};

const variantStyles = {
  [ALL_VARIANT_OPTIONS.OUTLINE]:
    "bg-white border border-gray-300 text-gray-500",
  [ALL_VARIANT_OPTIONS.SOLID]: "bg-gray-200 text-gray-500",
};
