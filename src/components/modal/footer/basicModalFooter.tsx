import { SquareButton } from "@/components/button";

interface BasicModalFooterProps {
  cancelText?: string;
  confirmText: string;
  onCancel?: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  leftText?: string;
  onBorder?: boolean;
}

export default function BasicModalFooter({
  cancelText = "キャンセル",
  confirmText,
  onCancel,
  onConfirm,
  isPending = false,
  disabled = false,
  showCancel = true,
  leftText,
  onBorder = true,
}: BasicModalFooterProps) {
  return (
    <div
      className={`flex justify-between items-center mt-2 ${
        onBorder ? "border-t border-gray-200 pt-4" : ""
      }`}
    >
      {/* 왼쪽 텍스트 */}
      <div className="flex-1">
        {leftText && <p className="text-sm text-gray-500">{leftText}</p>}
      </div>

      {/* 오른쪽 버튼들 */}
      <div className="flex gap-3">
        {showCancel && onCancel && (
          <SquareButton
            text={cancelText}
            color="gray"
            onClick={onCancel}
            disabled={isPending}
          />
        )}
        <SquareButton
          text={confirmText}
          color="primary"
          onClick={onConfirm}
          disabled={disabled}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
