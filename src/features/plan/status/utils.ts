import {
  BASIC_STATUS_OPTIONS,
  type StatusItem,
  type PlanInputStatus,
} from "./type";
import { INPUT_DATA_LABELS } from "../input/constant";
import { ALL_COLOR_OPTIONS, type AllSize } from "@/constants/theme";

export const getStatusChipProps = (size: Extract<AllSize, "md" | "sm">) => {
  return {
    [BASIC_STATUS_OPTIONS.NOT_STARTED]: {
      text: "未入力",
      color: ALL_COLOR_OPTIONS["LIGHT-GRAY"],
      size,
    },
    [BASIC_STATUS_OPTIONS.IN_PROGRESS]: {
      text: "入力中",
      color: ALL_COLOR_OPTIONS.YELLOW,
      size,
    },
    [BASIC_STATUS_OPTIONS.COMPLETED]: {
      text: "入力済",
      color: ALL_COLOR_OPTIONS.PRIMARY,
      size,
    },
  };
};

export const getResourceInputStatusItems = (
  planInputStatus: PlanInputStatus
) => {
  return [
    {
      label: INPUT_DATA_LABELS.RESOURCES_WORKFORCE,
      status: planInputStatus.resourcesWorkforceStatus,
    },
    {
      label: INPUT_DATA_LABELS.RESOURCES_FLIGHT_SCALE_DATA,
      status: planInputStatus.resourcesFlightScaleDataStatus,
    },
  ];
};

export const getAnalyticsInputStatusItems = (
  planInputStatus: PlanInputStatus
) => {
  return [
    {
      label: INPUT_DATA_LABELS.ANALYTICS_FLIGHT_CANDIDATES,
      status: planInputStatus.analyticsFlightCandidatesStatus,
    },
    {
      label: INPUT_DATA_LABELS.ANALYTICS_ROUND_TRIP_NORMALIZATION_FUNC,
      status: planInputStatus.analyticsRoundTripNormalizationStatus
        ? BASIC_STATUS_OPTIONS.COMPLETED
        : BASIC_STATUS_OPTIONS.NOT_STARTED,
    },
    {
      label: INPUT_DATA_LABELS.ANALYTICS_ROUTE_MIN_DISTRIBUTION,
      status: planInputStatus.analyticsMinDistributionCriteriaStatus
        ? BASIC_STATUS_OPTIONS.COMPLETED
        : BASIC_STATUS_OPTIONS.NOT_STARTED,
    },
  ];
};

export const getOverallStatus = (items: StatusItem[]) => {
  return items.every((item) => item.status === BASIC_STATUS_OPTIONS.COMPLETED)
    ? BASIC_STATUS_OPTIONS.COMPLETED
    : items.every((item) => item.status === BASIC_STATUS_OPTIONS.NOT_STARTED)
    ? BASIC_STATUS_OPTIONS.NOT_STARTED
    : BASIC_STATUS_OPTIONS.IN_PROGRESS;
};
