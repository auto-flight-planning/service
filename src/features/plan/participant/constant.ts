import { ParticipantPermissionEnum } from "./type";

export const PARTICIPANT_PERMISSION_LABELS = {
  [ParticipantPermissionEnum.VIEW]: "閲覧",
  [ParticipantPermissionEnum.REQUEST]: "依頼",
  [ParticipantPermissionEnum.INPUT]: "入力",
  [ParticipantPermissionEnum.EDIT]: "変更",
};
