import { Control, useFieldArray } from "react-hook-form";
import { Employee } from "@/features/employee/server/schemas/res.schema";
import { ParticipantsFieldSchema } from "../schemas/form.schema";
import { ParticipantPermissionEnum } from "../../type";

export default function useHandleParticipantsField(
  control: Control<{
    participants: ParticipantsFieldSchema;
  }>
) {
  const {
    fields: selectedParticipants,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "participants",
  });

  const addParticipant = ({ userId, lastName, firstName, email }: Employee) => {
    if (
      selectedParticipants.some((participant) => participant.userId === userId)
    )
      return;
    append({
      userId,
      lastName,
      firstName,
      email,
      permission: [ParticipantPermissionEnum.VIEW],
    });
  };

  const toggleParticipantPermission = (
    index: number,
    permissionOption: ParticipantPermissionEnum
  ) => {
    const participant = selectedParticipants[index];
    const toggleType = participant.permission.includes(permissionOption)
      ? "remove"
      : "add";

    update(index, {
      ...participant,
      permission:
        toggleType === "add"
          ? [...participant.permission, permissionOption]
          : participant.permission.filter(
              (permission) => permission !== permissionOption
            ),
    });
  };

  const removeParticipant = (index: number) => {
    remove(index);
  };

  return {
    selectedParticipants,
    addParticipant,
    toggleParticipantPermission,
    removeParticipant,
  };
}
