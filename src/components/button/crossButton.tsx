import { ButtonHTMLAttributes } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CrossButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium";
}

export default function CrossButton({
  size = "medium",
  ...props
}: CrossButtonProps) {
  const sizeClasses = {
    small: {
      button: "w-5 h-5",
      icon: "w-4 h-4",
    },
    medium: {
      button: "w-8 h-8",
      icon: "w-5 h-5",
    },
  };

  return (
    <button
      className={`bg-none border-none text-gray-500 cursor-pointer p-0 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 active:scale-90 text-2xl ${sizeClasses[size].button}`}
      {...props}
    >
      <XMarkIcon className={sizeClasses[size].icon} />
    </button>
  );
}
