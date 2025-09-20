"use client";

import { ReactNode } from "react";
import { ALL_COLOR_OPTIONS, type AllColor } from "@/constants/theme";

interface PointCardProps {
  color?: Extract<AllColor, "primary" | "gray" | "yellow" | "light-gray">;
  background?: "white" | "light";
  onBorder?: boolean;
  onPointBorder?: boolean;
  onShadow?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function PointCard({
  children,
  color = ALL_COLOR_OPTIONS.PRIMARY,
  background = "white",
  onBorder = false,
  onPointBorder = true,
  onShadow = true,
  className = "",
  onClick,
}: PointCardProps) {
  const styles = colorStyles[color];

  const baseStyles = [
    background === "white" ? styles.bgWhite : styles.bgLight,
    "rounded-xl",
    "p-5",
    "transition-all",
    "duration-300",
  ];

  if (onShadow) {
    baseStyles.push("shadow-lg");
  }

  if (onPointBorder) {
    baseStyles.push("border-l-6", styles.pointBorder);
  }

  if (onBorder) {
    baseStyles.push("border", styles.border);
  } else if (!onPointBorder) {
    baseStyles.push("border-2", "border-transparent", styles.hoverBorder);
  }

  if (onClick) {
    baseStyles.push(
      "cursor-pointer",
      "hover:-translate-y-1",
      onShadow ? "hover:shadow-xl" : ""
    );

    if (onShadow) {
      baseStyles.push(`hover:${styles.shadow}`);
    }
  }

  return (
    <div className={`${baseStyles.join(" ")} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

const colorStyles = {
  [ALL_COLOR_OPTIONS.PRIMARY]: {
    bgWhite: "bg-white",
    bgLight: "bg-primary-100",
    pointBorder: "border-l-primary-500",
    border: "border-primary-400",
    hoverBorder: "hover:border-primary-500",
    shadow: "shadow-primary-500/15",
  },
  [ALL_COLOR_OPTIONS.YELLOW]: {
    bgWhite: "bg-white",
    bgLight: "bg-yellow-100",
    pointBorder: "border-l-yellow-500",
    border: "border-yellow-400",
    hoverBorder: "hover:border-yellow-500",
    shadow: "shadow-yellow-500/15",
  },
  [ALL_COLOR_OPTIONS.GRAY]: {
    bgWhite: "bg-white",
    bgLight: "bg-gray-300",
    pointBorder: "border-l-gray-600",
    border: "border-gray-500",
    hoverBorder: "hover:border-gray-600",
    shadow: "shadow-gray-500/15",
  },
  [ALL_COLOR_OPTIONS["LIGHT-GRAY"]]: {
    bgWhite: "bg-white",
    bgLight: "bg-gray-100",
    pointBorder: "border-l-gray-500",
    border: "border-gray-400",
    hoverBorder: "hover:border-gray-500",
    shadow: "shadow-gray-500/15",
  },
};
