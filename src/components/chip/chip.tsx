import { ReactNode } from "react";

export interface ChipProps {
  text?: string;
  variant?: "outline" | "solid";
  size?: "extra-small" | "small" | "medium";
  color?: "primary" | "red" | "green" | "yellow" | "gray" | "light-gray";
  children?: ReactNode;
  className?: string;
}

const sizeClasses = {
  "extra-small": "px-1.5 py-0.75 text-[10px]",
  small: "px-2.5 py-1.5 text-xs",
  medium: "px-3 py-1.5 text-sm",
};
const colorClasses = {
  outline: {
    primary: "border border-primary-400 bg-white text-primary-400",
    red: "border border-red-400 bg-white text-red-400",
    green: "border border-green-500 bg-white text-green-500",
    yellow: "border border-yellow-500 bg-white text-yellow-500",
    gray: "border border-gray-500 bg-white text-gray-500",
    "light-gray": "border border-gray-400 bg-white text-gray-400",
  },
  solid: {
    primary: "border border-primary-400 bg-primary-400 text-white",
    red: "border border-red-400 bg-red-400 text-white",
    green: "border border-green-500 bg-green-500 text-white",
    yellow: "border border-yellow-400 bg-yellow-400 text-white",
    gray: "border border-gray-300 bg-gray-300 text-gray-600",
    "light-gray": "border border-gray-200 bg-gray-200 text-gray-500",
  },
};

export default function Chip({
  text,
  variant = "solid",
  size = "medium",
  color = "primary",
  children,
  className = "",
}: ChipProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        ${sizeClasses[size]}
        ${colorClasses[variant][color]}
        rounded-full
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
