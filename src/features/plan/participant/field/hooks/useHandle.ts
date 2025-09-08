import { Control, useFieldArray } from "react-hook-form";
import { Employee } from "@/features/employee/server/schemas/res.schema";
import { Participant, ParticipantsFieldSchema } from "../schemas/filed.schema";
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

  const removeParticipant = (index: number) => {
    remove(index);
  };

  // TODO: 한개씩 바꿀지 통으로 바꿀지 고민
  const updateParticipantPermission = (
    index: number,
    participant: Participant,
    permission: ParticipantPermissionEnum[]
  ) => {
    update(index, {
      ...participant,
      permission,
    });
  };

  return {
    selectedParticipants,
    addParticipant,
    removeParticipant,
    updateParticipantPermission,
  };
}
