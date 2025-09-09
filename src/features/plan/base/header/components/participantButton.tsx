interface ParticipantButtonProps {
  planId: string;
  onClick: () => void;
  className?: string;
}

export default function ParticipantButton({
  planId,
  onClick,
  className = "",
}: ParticipantButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-white/70 hover:bg-white/90
        text-gray-700 hover:text-gray-900
        border border-gray-200 hover:border-gray-300
        px-2.5 py-1
        rounded-md
        text-sm font-medium
        cursor-pointer
        transition-all duration-200 ease-in-out
        flex items-center gap-1.5
        active:scale-90
        group
        ${className}
      `}
    >
      <span className="text-sm">👥</span>
      <span className="text-xs">参加者編集</span>
    </button>
  );
}
