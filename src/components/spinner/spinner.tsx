interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "gray" | "white";
  className?: string;
}

export default function Spinner({
  size = "md",
  color = "gray",
  className = "",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    gray: "border-gray-500",
    white: "border-white",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  );
}
