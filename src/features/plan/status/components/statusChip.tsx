export enum StatusChipColor {
  PRIMARY = "primary",
  GREEN = "green",
  YELLOW = "yellow",
  "LIGHT-GRAY" = "light-gray",
}
const colorStyles = {
  primary: "bg-primary-500/10 text-primary-500",
  green: "bg-green-500/10 text-green-500",
  yellow: "bg-yellow-500/10 text-yellow-500",
  "light-gray": "bg-gray-100 text-gray-500",
};

export enum StatusChipSize {
  MEDIUM = "medium",
  SMALL = "small",
}
const sizeStyles = {
  medium:
    "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2",
  small: "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-2",
};

const borderStyles = {
  primary: "border border-primary-500",
  green: "border border-green-500",
  yellow: "border border-yellow-500",
  "light-gray": "border border-gray-300",
};

export default function StatusChip({
  text,
  color,
  size = "medium",
  showDot = true,
  onBorder = false,
  className = "",
}: {
  text: string;
  color: StatusChipColor;
  size?: "medium" | "small";
  showDot?: boolean;
  onBorder?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${colorStyles[color]} ${sizeStyles[size]} ${className} ${
        onBorder ? borderStyles[color] : ""
      }`}
    >
      {showDot && <div className="w-2 h-2 bg-current rounded-full"></div>}
      {text && <span>{text}</span>}
    </div>
  );
}
