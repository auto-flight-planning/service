import { SquareButton } from "@/components/button";
import useModalStore from "../../stores/modalStore";

interface BasicModalFooterProps {
  cancelProps?: {
    text?: string;
    onClick?: () => void;
    color?: "primary" | "gray" | "light-gray";
    disabled?: boolean;
    hidden?: boolean;
  };
  confirmProps: {
    text: string;
    onClick: () => void;
    color?: "primary" | "gray" | "light-gray";
    disabled?: boolean;
    isLoading?: boolean;
  };
  explanationText?: string;
}

export default function BasicModalFooter({
  cancelProps = {
    text: "キャンセル",
    onClick: undefined,
    color: "light-gray",
    disabled: false,
    hidden: false,
  },
  confirmProps = {
    text: "保存",
    onClick: () => {},
    color: "primary",
    disabled: false,
    isLoading: false,
  },
  explanationText = "",
}: BasicModalFooterProps) {
  const { closeModal } = useModalStore();

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
            text={cancelProps.text!}
            onClick={cancelProps.onClick || closeModal}
            color={cancelProps.color}
            disabled={cancelProps.disabled}
          />
        )}
        <SquareButton
          text={confirmProps.text}
          onClick={confirmProps.onClick}
          color={confirmProps.color}
          disabled={confirmProps.disabled}
          isLoading={confirmProps.isLoading}
        />
      </div>
    </div>
  );
}
