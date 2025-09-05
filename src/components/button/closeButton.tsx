import { ButtonHTMLAttributes } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CloseButton(props: CloseButtonProps) {
  return (
    <button
      className="bg-none border-none text-gray-500 cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 text-2xl"
      {...props}
    >
      <XMarkIcon className="w-5 h-5" />
    </button>
  );
}
