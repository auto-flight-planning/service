"use client";

import { ReactNode } from "react";
import { Chip, type ChipProps } from "@/components/chip";

interface ChipButtonProps {
  text: string;
  variant?: ChipProps["variant"];
  size?: ChipProps["size"];
  color?: ChipProps["color"];
  children?: ReactNode;
  onClick: () => void;
}

export default function ChipButton({
  text,
  variant = "outline",
  size = "medium",
  color = "primary",
  children,
  onClick,
}: ChipButtonProps) {
  const hoverBgClasses = {
    outline: {
      primary:
        "hover:bg-gray-50 hover:border-primary-500 hover:text-primary-500",
      red: "hover:bg-red-50 hover:border-red-500 hover:text-red-500",
      green: "hover:bg-green-50 hover:border-green-600 hover:text-green-600",
      yellow:
        "hover:bg-yellow-50 hover:border-yellow-600 hover:text-yellow-600",
      gray: "hover:bg-gray-50 hover:border-gray-600 hover:text-gray-600",
      "light-gray":
        "hover:bg-gray-50 hover:border-gray-500 hover:text-gray-500",
    },
    solid: {
      primary: "hover:bg-primary-500",
      red: "hover:bg-red-500",
      green: "hover:bg-green-600",
      yellow: "hover:bg-yellow-500",
      gray: "hover:bg-gray-400 hover:text-gray-700",
      "light-gray": "hover:bg-gray-300 hover:text-gray-600",
    },
  };
  const interactionClasses = `cursor-pointer ${hoverBgClasses[variant][color]} active:scale-95 transition-all duration-200`;

  return (
    <div role="button" onClick={onClick}>
      <Chip
        text={text}
        variant={variant}
        size={size}
        color={color}
        className={interactionClasses}
      >
        {children}
      </Chip>
    </div>
  );
}
