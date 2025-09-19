export enum ParticipantPermissionEnum {
  VIEW = "VIEW",
  REQUEST = "REQUEST",
  INPUT = "INPUT",
  EDIT = "EDIT",
}

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
