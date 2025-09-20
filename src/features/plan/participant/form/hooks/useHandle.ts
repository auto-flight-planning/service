import { Control, useFieldArray } from "react-hook-form";
import { type ParticipantsFieldSchema } from "../schemas/form.schema";
import { type Employee } from "@/features/employee/type";
import {
  PARTICIPANT_PERMISSION_OPTIONS,
  type ParticipantPermission,
} from "../../type";

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
      permission: [PARTICIPANT_PERMISSION_OPTIONS.VIEW],
    });
  };

  const toggleParticipantPermission = (
    index: number,
    permissionOption: ParticipantPermission
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
