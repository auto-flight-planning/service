import { SquareButton } from "@/components/button";

interface BasicModalFooterProps {
  cancelProps: {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: "primary" | "gray" | "light-gray";
    hidden?: boolean;
  };
  confirmProps: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: "primary" | "gray" | "light-gray";
    isPending?: boolean;
  };
  explanationText?: string;
}

export default function BasicModalFooter({
  cancelProps = {
    text: "キャンセル",
    onClick: () => {},
    disabled: false,
    color: "gray",
    hidden: false,
  },
  confirmProps = {
    text: "保存",
    onClick: () => {},
    disabled: false,
    color: "primary",
    isPending: false,
  },
  explanationText = "",
}: BasicModalFooterProps) {
  return (
    <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-4">
      <div className="flex-1">
        {explanationText && (
          <p className="text-sm text-gray-500">{explanationText}</p>
        )}
      </div>

      <div className="flex gap-3">
        {!cancelProps.hidden && (
          <SquareButton
            text={cancelProps.text}
            color={cancelProps.color}
            onClick={cancelProps.onClick}
            disabled={cancelProps.disabled}
          />
        )}
        <SquareButton
          text={confirmProps.text}
          color={confirmProps.color}
          onClick={confirmProps.onClick}
          disabled={confirmProps.disabled}
          isPending={confirmProps.isPending}
        />
      </div>
    </div>
  );
}
