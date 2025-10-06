import { ButtonHTMLAttributes } from "react";
import {
  ALL_SIZE_OPTIONS,
  ALL_COLOR_OPTIONS,
  type AllSize,
  type AllColor,
} from "@/constants/theme";

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconComponent: React.ComponentType<{ className?: string }>;
  size?: Extract<AllSize, "sm" | "md">;
  color?: Extract<AllColor, "transparent" | "light-gray">;
}

export default function IconButton({
  IconComponent,
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.TRANSPARENT,
  ...props
}: PlusButtonProps) {
  return (
    <button
      className={`transition-all duration-150 active:scale-90 cursor-pointer p-0 flex items-center justify-center rounded-full text-2xl ${sizeStyles[size].button} ${colorStyles[color]}`}
      {...props}
    >
      <IconComponent className={sizeStyles[size].icon} />
    </button>
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.SM]: {
    button: "w-5 h-5",
    icon: "w-4 h-4",
  },
  [ALL_SIZE_OPTIONS.MD]: {
    button: "w-8 h-8",
    icon: "w-5 h-5",
  },
};

const colorStyles = {
  [ALL_COLOR_OPTIONS.TRANSPARENT]:
    "bg-transparent text-gray-500 hover:bg-gray-100/50 hover:text-gray-600",
  [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]:
    "bg-gray-100 bg-opacity-50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-700",
};
