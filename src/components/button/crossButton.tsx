import { ButtonHTMLAttributes } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ALL_SIZE_OPTIONS, type AllSize } from "@/constants/theme";

interface CrossButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Extract<AllSize, "sm" | "md">;
}

export default function CrossButton({
  size = ALL_SIZE_OPTIONS.MD,
  ...props
}: CrossButtonProps) {
  return (
    <button
      className={`bg-none border-none text-gray-500 cursor-pointer p-0 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 active:scale-90 text-2xl ${sizeStyles[size].button}`}
      {...props}
    >
      <XMarkIcon className={sizeStyles[size].icon} />
    </button>
  );
}

const sizeStyles = {
  [ALL_SIZE_OPTIONS.SM]: {
    button: "w-5 h-5",
    icon: "w-4 h-4",
  },
  [ALL_SIZE_OPTIONS.MD]: {
    button: "w-8 h-8",
    icon: "w-5 h-5",
  },
};
