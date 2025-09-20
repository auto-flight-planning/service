import {
  ALL_COLOR_OPTIONS,
  type AllColor,
  ALL_SIZE_OPTIONS,
  type AllSize,
} from "@/constants/theme";

interface SpinnerProps {
  size?: Extract<AllSize, "sm" | "md" | "lg">;
  color?: Extract<AllColor, "gray" | "white">;
  className?: string;
}

export default function Spinner({
  size = ALL_SIZE_OPTIONS.MD,
  color = ALL_COLOR_OPTIONS.GRAY,
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
    />
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.SM]: "w-3 h-3",
  [ALL_SIZE_OPTIONS.MD]: "w-4 h-4",
  [ALL_SIZE_OPTIONS.LG]: "w-8 h-8",
};

const colorStyles = {
  [ALL_COLOR_OPTIONS.GRAY]: "border-gray-500",
  [ALL_COLOR_OPTIONS.WHITE]: "border-white",
};
