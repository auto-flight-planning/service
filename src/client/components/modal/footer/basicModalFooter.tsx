import { SquareButton } from "@/client/components/button";

interface BasicModalFooterProps {
  cancelText?: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  disabled?: boolean;
}

export default function BasicModalFooter({
  cancelText = "キャンセル",
  confirmText,
  onCancel,
  onConfirm,
  isPending = false,
  disabled = false,
}: BasicModalFooterProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-200">
      <SquareButton
        text={cancelText}
        color="gray"
        onClick={onCancel}
        disabled={isPending}
      />
      <SquareButton
        text={confirmText}
        color="primary"
        onClick={onConfirm}
        disabled={disabled}
        isPending={isPending}
      />
    </div>
  );
}
