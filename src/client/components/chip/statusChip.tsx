"use client";

type ColorTheme = "primary" | "green" | "yellow" | "gray";

interface StatusChipProps {
  text?: string;
  showDot?: boolean;
  color?: ColorTheme;
  className?: string;
}

const colorStyles = {
  primary: "bg-primary-500/10 text-primary-500",
  green: "bg-green-500/10 text-green-500",
  yellow: "bg-yellow-500/10 text-yellow-500",
  gray: "bg-gray-100 text-gray-500",
};

export default function StatusChip({
  text,
  showDot = true,
  color = "primary",
  className = "",
}: StatusChipProps) {
  return (
    <div
      className={`${colorStyles[color]} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${className}`}
    >
      {showDot && <div className="w-2 h-2 bg-current rounded-full"></div>}
      {text && <span>{text}</span>}
    </div>
  );
}
