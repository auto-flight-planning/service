import { ButtonHTMLAttributes } from "react";

interface UnderlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function UnderlineButton({
  text,
  ...props
}: UnderlineButtonProps) {
  return (
    <button
      className="text-sm text-primary-500 underline hover:text-primary-600 active:text-primary-700 active:scale-95 transition-all duration-200 cursor-pointer bg-transparent border-none p-0"
      {...props}
    >
      {text}
    </button>
  );
}
