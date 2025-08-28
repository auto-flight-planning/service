"use client";

import { ReactNode } from "react";

interface WhiteCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function WhiteCard({
  children,
  onClick,
  className = "",
}: WhiteCardProps) {
  return (
    <div
      className={`
        bg-white 
        rounded-2xl 
        p-8 
        shadow-lg 
        cursor-pointer 
        transition-all 
        duration-300 
        ease-in-out 
        border-2 
        border-transparent 
        relative
        hover:border-primary-500 
        hover:-translate-y-1 
        hover:shadow-xl 
        hover:shadow-primary-500/15
        active:scale-95
        active:bg-gray-100
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
