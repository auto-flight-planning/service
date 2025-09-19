import { useUserStore } from "@/features/auth";
import { ChipButton, CrossButton } from "@/components/button";
import { Chip, type ChipProps } from "@/components/chip";
import {
  PARTICIPANT_PERMISSION_OPTIONS,
  type ParticipantPermission,
} from "../type";
import {
  PARTICIPANT_PERMISSION_LABELS,
  PARTICIPANT_PERMISSION_TOOLTIP_TEXT,
} from "../constant";
import { Tooltip } from "@/components/tooltip";

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

const permissionColorClasses: Record<
  ParticipantPermission,
  ChipProps["color"]
> = {
  [PARTICIPANT_PERMISSION_OPTIONS.VIEW]: "light-gray",
  [PARTICIPANT_PERMISSION_OPTIONS.REQUEST]: "green",
  [PARTICIPANT_PERMISSION_OPTIONS.INPUT]: "yellow",
  [PARTICIPANT_PERMISSION_OPTIONS.EDIT]: "primary",
};

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
                        size="extra-small"
                        color={permissionColorClasses[permissionOption]}
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
                    size="extra-small"
                    color={permissionColorClasses[p]}
                  />
                </Tooltip>
              ))}
            </>
          )}
        </div>
      </div>
      {type === "edit" && (
        <CrossButton
          size="small"
          type="button"
          onClick={() => onRemove?.(participantIndex)}
        />
      )}
    </div>
  );
}
