import { GetPlanInputsStatusResSchema } from "./server/schemas/res.schema";
import { ListDataItem, StatusEnum } from "./type";
import { INPUT_DATA_LABELS } from "../input/constant";

export const getResourceInputStatusItems = (
  planInputStatus: GetPlanInputsStatusResSchema
) => {
  return [
    {
      label: INPUT_DATA_LABELS.RESOURCES_WORKFORCE,
      status: planInputStatus.resourcesWorkforceStatus,
    },
    {
      label: INPUT_DATA_LABELS.RESOURCES_FLIGHT_SCALES,
      status: planInputStatus.resourcesFlightScalesStatus
        ? StatusEnum.COMPLETED
        : StatusEnum.NOT_STARTED,
    },
    {
      label: INPUT_DATA_LABELS.RESOURCES_FLIGHT_SCALE_DATA,
      status: planInputStatus.resourcesFlightScaleDataStatus,
    },
  ];
};

export const getAnalyticsInputStatusItems = (
  planInputStatus: GetPlanInputsStatusResSchema
) => {
  return [
    {
      label: INPUT_DATA_LABELS.ANALYTICS_FLIGHT_CANDIDATES,
      status: planInputStatus.analyticsFlightCandidatesStatus,
    },
    {
      label: INPUT_DATA_LABELS.ANALYTICS_ROUND_TRIP_NORMALIZATION_FUNC,
      status: planInputStatus.analyticsRoundTripNormalizationStatus
        ? StatusEnum.COMPLETED
        : StatusEnum.NOT_STARTED,
    },
    {
      label: INPUT_DATA_LABELS.ANALYTICS_ROUTE_MIN_DISTRIBUTION,
      status: planInputStatus.analyticsMinDistributionCriteriaStatus
        ? StatusEnum.COMPLETED
        : StatusEnum.NOT_STARTED,
    },
  ];
};

export const getOverallStatus = (items: ListDataItem[]) => {
  return items.every((item) => item.status === StatusEnum.COMPLETED)
    ? StatusEnum.COMPLETED
    : items.every((item) => item.status === StatusEnum.NOT_STARTED)
    ? StatusEnum.NOT_STARTED
    : StatusEnum.IN_PROGRESS;
};
