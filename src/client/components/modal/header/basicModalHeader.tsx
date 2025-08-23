import { CloseButton } from "@/client/components/button";

interface BasicModalHeaderProps {
  title: string;
  onClose: () => void;
}

export default function BasicModalHeader({
  title,
  onClose,
}: BasicModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <CloseButton onClick={onClose} />
    </div>
  );
}
