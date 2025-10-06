import {
  type PlanParticipants,
  type ParticipantPermission,
} from "@/features/plan/participant/type";

export const dateToString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const dateToYearMonthJP = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

export const errorResToMessage = (res: Response, endpoint: string) =>
  `(${res.status}) ${res.statusText}\n${endpoint} を呼び出しに失敗しました。`;

export const minutesToTime = (minutes: number | bigint) => {
  const m = Number(minutes);
  const hours = Math.floor(m / 60);
  const remainingMinutes = m % 60;
  return { hours, minutes: remainingMinutes };
};

export const timeToMinutes = (time: {
  hours?: number | null;
  minutes?: number | null;
}) => {
  if (!time.hours && !time.minutes) return undefined;
  const h = time.hours ?? 0;
  const m = time.minutes ?? 0;
  return h * 60 + m;
};

// Domain utils
export const checkPlanParticipantsPermission = ({
  planParticipants,
  userId,
  type,
}: {
  planParticipants: PlanParticipants;
  userId: string;
  type: "CREATOR" | ParticipantPermission;
}) => {
  const isCreator = planParticipants.creator.userId === userId;
  const participant = planParticipants.participantDataList.find(
    (participant) => participant.userId === userId
  );

  if (type === "CREATOR") {
    return isCreator;
  } else {
    if (isCreator) return true;
    if (!participant) return false;
    return participant.permission.includes(type);
  }
};
