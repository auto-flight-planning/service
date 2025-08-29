import { CloseButton } from "@/client/components/button";

interface NumberedModalHeaderProps {
  title: string;
  number?: number;
  onClose: () => void;
}

export default function NumberedModalHeader({
  title,
  number,
  onClose,
}: NumberedModalHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-6 border-b border-gray-200 rounded-t-xl">
      <div className="flex items-center gap-4">
        {number && (
          <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {number}
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}
