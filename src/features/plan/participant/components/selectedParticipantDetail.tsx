import { RoundButton } from "@/components/button";
import { Chip, type ChipProps } from "@/components/chip";
import { ParticipantPermissionEnum } from "../type";
import { PARTICIPANT_PERMISSION_LABELS } from "../constant";

interface SelectedParticipantDetailProps {
  fullName: string;
  email: string;
  permission: ParticipantPermissionEnum[];
}

const permissionColorClasses: Record<
  ParticipantPermissionEnum,
  ChipProps["color"]
> = {
  [ParticipantPermissionEnum.VIEW]: "light-gray",
  [ParticipantPermissionEnum.REQUEST]: "green",
  [ParticipantPermissionEnum.INPUT]: "yellow",
  [ParticipantPermissionEnum.EDIT]: "primary",
};

export default function SelectedParticipantDetail({
  fullName,
  email,
  permission,
}: SelectedParticipantDetailProps) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-primary-50 border border-primary-100 rounded-lg">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium text-sm">{fullName}</span>
          <div className="flex items-center gap-1">
            {["VIEW", "REQUEST", "INPUT", "EDIT"].map((p, index) => (
              <Chip
                key={index}
                variant="outline"
                text={
                  PARTICIPANT_PERMISSION_LABELS[p as ParticipantPermissionEnum]
                }
                size="extra-small"
                color={permissionColorClasses[p as ParticipantPermissionEnum]}
              />
            ))}
          </div>
        </div>
        <span className="text-gray-400 text-xs mt-1">{email}</span>
      </div>

      <RoundButton
        text="権限選択"
        size="small"
        type="button"
        onClick={() => {}}
      />
    </div>
  );
}
