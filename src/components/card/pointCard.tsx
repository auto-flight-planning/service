"use client";

import { ReactNode } from "react";

type ColorVariant = "primary" | "gray" | "yellow" | "light-gray";

interface PointCardProps {
  color?: ColorVariant;
  background?: "white" | "light"; // white: 흰색 배경, light: 색상에 맞는 연한 배경
  onBorder?: boolean;
  onPointBorder?: boolean;
  onShadow?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const colorStyles = {
  primary: {
    bgWhite: "bg-white",
    bgLight: "bg-primary-100",
    pointBorder: "border-l-primary-500",
    border: "border-primary-400",
    hoverBorder: "hover:border-primary-500",
    shadow: "shadow-primary-500/15",
  },
  "light-gray": {
    bgWhite: "bg-white",
    bgLight: "bg-gray-100", // Tailwind 기본 gray-100 사용
    pointBorder: "border-l-gray-500",
    border: "border-gray-400",
    hoverBorder: "hover:border-gray-500",
    shadow: "shadow-gray-500/15",
  },
  gray: {
    bgWhite: "bg-white",
    bgLight: "bg-gray-300",
    pointBorder: "border-l-gray-600",
    border: "border-gray-500",
    hoverBorder: "hover:border-gray-600",
    shadow: "shadow-gray-500/15",
  },
  yellow: {
    bgWhite: "bg-white",
    bgLight: "bg-yellow-100",
    pointBorder: "border-l-yellow-500",
    border: "border-yellow-400",
    hoverBorder: "hover:border-yellow-500",
    shadow: "shadow-yellow-500/15",
  },
};

export default function PointCard({
  children,
  color = "primary",
  background = "white",
  onBorder = false,
  onPointBorder = true,
  onShadow = true,
  className = "",
  onClick,
}: PointCardProps) {
  const styles = colorStyles[color];

  const baseClasses = [
    background === "white" ? styles.bgWhite : styles.bgLight,
    "rounded-xl",
    "p-5",
    "transition-all",
    "duration-300",
  ];

  // 그림자 적용
  if (onShadow) {
    baseClasses.push("shadow-lg");
  }

  // 포인트 보더 (왼쪽 굵은 라인)
  if (onPointBorder) {
    baseClasses.push("border-l-6", styles.pointBorder);
  }

  // 전체 보더
  if (onBorder) {
    baseClasses.push("border", styles.border);
  } else if (!onPointBorder) {
    // 기본적으로 투명 보더를 주고 호버시 색상 변경
    baseClasses.push("border-2", "border-transparent", styles.hoverBorder);
  }

  // 클릭 가능한 경우 호버 효과
  if (onClick) {
    baseClasses.push(
      "cursor-pointer",
      "hover:-translate-y-1",
      onShadow ? "hover:shadow-xl" : ""
    );

    if (onShadow) {
      baseClasses.push(`hover:${styles.shadow}`);
    }
  }

  return (
    <div className={`${baseClasses.join(" ")} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
