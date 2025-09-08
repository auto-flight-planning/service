import { ReactNode } from "react";

export interface ChipProps {
  text?: string;
  variant?: "outline" | "solid";
  size?: "extra-small" | "small" | "medium";
  color?: "primary" | "red" | "green" | "yellow" | "gray" | "light-gray";
  children?: ReactNode;
}

const sizeClasses = {
  "extra-small": "px-1.5 py-0.75 text-[10px]",
  small: "px-2.5 py-1.5 text-xs",
  medium: "px-3 py-1.5 text-sm",
};
const solidColorClasses = {
  primary: "bg-primary-200 text-gray-800",
  red: "bg-red-500 text-white",
  green: "bg-green-500 text-white",
  yellow: "bg-yellow-400 text-gray-800",
  gray: "bg-gray-200 text-gray-800",
  "light-gray": "bg-gray-100 text-gray-800",
};
const outlineColorClasses = {
  primary: "border border-primary-400 bg-white text-primary-400",
  red: "border border-red-500 bg-white text-red-500",
  green: "border border-green-500 bg-white text-green-500",
  yellow: "border border-yellow-500 bg-white text-yellow-500",
  gray: "border border-gray-700 bg-white text-gray-700",
  "light-gray": "border border-gray-400 bg-white text-gray-400",
};

export default function Chip({
  text,
  variant = "solid",
  size = "medium",
  color = "primary",
  children,
}: ChipProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        ${sizeClasses[size]}
        ${
          variant === "outline"
            ? outlineColorClasses[color]
            : solidColorClasses[color]
        }
        rounded-full
        transition-colors
        duration-200
      `}
    >
      {text ? <span>{text}</span> : children}
    </div>
  );
}
