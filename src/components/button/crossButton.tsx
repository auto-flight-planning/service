import { ButtonHTMLAttributes } from "react";
import { IconButton } from "@/components/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ALL_SIZE_OPTIONS,
  ALL_COLOR_OPTIONS,
  type AllSize,
  type AllColor,
} from "@/constants/theme";

interface CrossButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Extract<AllSize, "sm" | "md">;
  color?: Extract<AllColor, "transparent" | "light-gray">;
}

export default function CrossButton({
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.TRANSPARENT,
  ...props
}: CrossButtonProps) {
  return <IconButton IconComponent={XMarkIcon} size={size} {...props} />;
}
