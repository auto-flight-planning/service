"use client";

export default function SquareButton({
  text,
  onClick,
  color = "primary",
  size = "medium",
}: {
  text: string;
  onClick: () => void;
  color?: "primary" | "gray";
  size?: "small" | "medium" | "large";
}) {
  const baseClasses =
    "rounded-md font-medium transition-all duration-200 cursor-pointer border-none active:scale-95";

  const colorClasses = {
    primary: "bg-[#0284c7] hover:bg-[#0369a1] text-white",
    gray: "bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#6b7280]",
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
