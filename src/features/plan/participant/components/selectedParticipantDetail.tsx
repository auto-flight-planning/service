import { ChipButton, CrossButton } from "@/components/button";
import { Chip, type ChipProps } from "@/components/chip";
import {
  PARTICIPANT_PERMISSION_OPTIONS,
  type ParticipantPermission,
} from "../type";
import { PARTICIPANT_PERMISSION_LABELS } from "../constant";

interface SelectedParticipantDetailProps {
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
  type,
  participantIndex,
  fullName,
  email,
  permission,
  onTogglePermission,
  onRemove,
}: SelectedParticipantDetailProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-100 rounded-lg">
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
                    <ChipButton
                      key={permissionOption}
                      text={`${
                        PARTICIPANT_PERMISSION_LABELS[permissionOption]
                      }${isSelected ? " ✓" : ""}`}
                      variant={isSelected ? "solid" : "outline"}
                      size="extra-small"
                      color={permissionColorClasses[permissionOption]}
                      onClick={() =>
                        onTogglePermission?.(participantIndex, permissionOption)
                      }
                      disabled={
                        permissionOption === PARTICIPANT_PERMISSION_OPTIONS.VIEW
                      }
                    />
                  );
                }
              )}
            </div>
          ) : (
            <>
              {permission.map((p, index) => (
                <Chip
                  key={index}
                  text={`${PARTICIPANT_PERMISSION_LABELS[p]}`}
                  variant="solid"
                  size="extra-small"
                  color={permissionColorClasses[p]}
                />
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
