import { useUserStore } from "@/features/auth";
import { ChipButton, CrossButton } from "@/components/button";
import { Chip } from "@/components/chip";
import { Tooltip } from "@/components/tooltip";
import {
  PARTICIPANT_PERMISSION_OPTIONS,
  type ParticipantPermission,
} from "../type";
import {
  PARTICIPANT_PERMISSION_LABELS,
  PARTICIPANT_PERMISSION_TOOLTIP_TEXT,
} from "../constant";
import { ALL_COLOR_OPTIONS } from "@/constants/theme";

interface SelectedParticipantDetailProps {
  userId: string;
  type: "view" | "edit";
  participantIndex: number;
  fullName: string;
  email: string;
  permission: ParticipantPermission[];
  onTogglePermission?: (
    index: number,
    permissionOption: ParticipantPermission
  ) => void;
  onRemove?: (index: number) => void;
}

export default function SelectedParticipantDetail({
  userId,
  type,
  participantIndex,
  fullName,
  email,
  permission,
  onTogglePermission,
  onRemove,
}: SelectedParticipantDetailProps) {
  const { user } = useUserStore();

  return (
    <div
      className={`flex items-center justify-between p-3 border border-primary-100 rounded-lg relative ${
        userId === user!.userId
          ? "bg-primary-100 border-primary-200"
          : "bg-primary-50"
      }`}
    >
      {userId === user!.userId && (
        <span className="absolute top-2.5 right-2.5 text-gray-400 text-[10px]">
          (本人)
        </span>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium text-sm">{fullName}</span>
          <span className="text-gray-400 text-xs">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs underline">作業権限</span>
          {type === "edit" ? (
            <div className="flex items-center gap-1">
              {Object.values(PARTICIPANT_PERMISSION_OPTIONS).map(
                (permissionOption) => {
                  const isSelected = permission.includes(permissionOption);
                  return (
                    <Tooltip
                      key={permissionOption}
                      text={
                        PARTICIPANT_PERMISSION_TOOLTIP_TEXT[permissionOption]
                      }
                    >
                      <ChipButton
                        key={permissionOption}
                        text={`${
                          PARTICIPANT_PERMISSION_LABELS[permissionOption]
                        }${isSelected ? " ✓" : ""}`}
                        variant={isSelected ? "solid" : "outline"}
                        size="xs"
                        color={permissionColorStyles[permissionOption]}
                        onClick={() =>
                          onTogglePermission?.(
                            participantIndex,
                            permissionOption
                          )
                        }
                        disabled={
                          permissionOption ===
                          PARTICIPANT_PERMISSION_OPTIONS.VIEW
                        }
                      />
                    </Tooltip>
                  );
                }
              )}
            </div>
          ) : (
            <>
              {permission.map((p) => (
                <Tooltip key={p} text={PARTICIPANT_PERMISSION_TOOLTIP_TEXT[p]}>
                  <Chip
                    text={`${PARTICIPANT_PERMISSION_LABELS[p]}`}
                    variant="solid"
                    size="xs"
                    color={permissionColorStyles[p]}
                  />
                </Tooltip>
              ))}
            </>
          )}
        </div>
      </div>
      {type === "edit" && (
        <CrossButton
          size="sm"
          type="button"
          onClick={() => onRemove?.(participantIndex)}
        />
      )}
    </div>
  );
}

const permissionColorStyles = {
  [PARTICIPANT_PERMISSION_OPTIONS.VIEW]: ALL_COLOR_OPTIONS["LIGHT-GRAY"],
  [PARTICIPANT_PERMISSION_OPTIONS.REQUEST]: ALL_COLOR_OPTIONS.GREEN,
  [PARTICIPANT_PERMISSION_OPTIONS.INPUT]: ALL_COLOR_OPTIONS.YELLOW,
  [PARTICIPANT_PERMISSION_OPTIONS.EDIT]: ALL_COLOR_OPTIONS.PRIMARY,
};
