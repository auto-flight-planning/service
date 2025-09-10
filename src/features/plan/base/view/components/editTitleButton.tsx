import { PencilIcon } from "@heroicons/react/24/solid";

interface EditTitleButtonProps {
  onClick: () => void;
  className?: string;
}

export default function EditTitleButton({
  onClick,
  className = "",
}: EditTitleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-6 h-6 rounded-full
        bg-primary-500 hover:bg-primary-600
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        hover:scale-105
        group
        cursor-pointer
        active:scale-90
        ${className}
      `}
    >
      <PencilIcon className="w-3 h-3 text-white" />
    </button>
  );
}
