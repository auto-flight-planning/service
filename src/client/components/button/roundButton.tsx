"use client";

export default function RoundButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-white border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
