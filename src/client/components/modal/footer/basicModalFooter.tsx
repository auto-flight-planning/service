import { SquareButton } from "@/client/components/button";

interface BasicModalFooterProps {
  cancelText?: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function BasicModalFooter({
  cancelText = "キャンセル",
  confirmText,
  onCancel,
  onConfirm,
  isLoading = false,
  disabled = false,
}: BasicModalFooterProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-200">
      <SquareButton
        text={cancelText}
        color="gray"
        onClick={onCancel}
        disabled={isLoading}
      />
      <SquareButton
        text={isLoading ? "処理中..." : confirmText}
        color="primary"
        onClick={onConfirm}
        disabled={disabled || isLoading}
      />
    </div>
  );
}
