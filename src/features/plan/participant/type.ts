import { type Employee } from "@/features/employee/type";

export const PARTICIPANT_PERMISSION_OPTIONS = {
  VIEW: "VIEW",
  REQUEST: "REQUEST",
  INPUT: "INPUT",
  EDIT: "EDIT",
} as const;
export const PARTICIPANT_PERMISSION_VALUES = [
  "VIEW",
  "REQUEST",
  "INPUT",
  "EDIT",
] as const;
export type ParticipantPermission =
  (typeof PARTICIPANT_PERMISSION_VALUES)[number];

export type ParticipantDataList = {
  userId: string;
  permission: ParticipantPermission[];
}[];
export type UpdateParticipantData = {
  addParticipants: ParticipantDataList;
  updateParticipants: ParticipantDataList;
  removeParticipantIds: string[];
};

export type PlanParticipants = {
  planId: string;
  creator: Employee;
  participantDataList: (Employee & {
    permission: ParticipantPermission[];
  })[];
};
