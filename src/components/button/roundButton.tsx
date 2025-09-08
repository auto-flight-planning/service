"use client";

import { ButtonHTMLAttributes } from "react";

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "outline" | "solid";
  size?: "small" | "medium";
}

export default function RoundButton({
  text,
  variant = "outline",
  size = "medium",
  onClick,
  ...props
}: RoundButtonProps) {
  const variantClasses = {
    outline: "bg-white border border-gray-300 text-gray-500",
    solid: "bg-gray-200 text-gray-500",
  };

  const sizeClasses = {
    small: "text-xs px-2.5 py-1.5",
    medium: "text-sm px-4 py-2",
  };

  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}
