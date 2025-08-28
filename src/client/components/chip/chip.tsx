"use client";

import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export default function Chip({
  children,
  onRemove,
  className = "",
}: ChipProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1.5
        bg-gray-100
        text-gray-700
        text-sm
        rounded-full
        transition-colors
        duration-200
        ${className}
      `}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-4 h-4 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors duration-150 hover:cursor-pointer"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
