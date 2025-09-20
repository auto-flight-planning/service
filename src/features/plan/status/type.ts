export const PLAN_STATUS_OPTIONS = {
  INPUT: "INPUT",
  RESULT: "RESULT",
  REVIEW: "REVIEW",
  ADOPTED: "ADOPTED",
} as const;
export const PLAN_STATUS_VALUES = [
  "INPUT",
  "RESULT",
  "REVIEW",
  "ADOPTED",
] as const;
export type PlanStatus = (typeof PLAN_STATUS_VALUES)[number];

export const BASIC_STATUS_OPTIONS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;
export const BASIC_STATUS_VALUES = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;
export type BasicStatus = (typeof BASIC_STATUS_VALUES)[number];

export interface StatusItem {
  status: BasicStatus;
  label: string;
}

export type PlanInputStatus = {
  resourcesWorkforceStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  resourcesFlightScalesStatus: boolean;
  resourcesFlightScaleDataStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  analyticsFlightCandidatesStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  analyticsRoundTripNormalizationStatus: boolean;
  analyticsMinDistributionCriteriaStatus: boolean;
  airportsScheduleDataStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};
