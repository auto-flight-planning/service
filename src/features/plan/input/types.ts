import { Dispatch, SetStateAction } from "react";

export type WorkforceData = {
  captainCnt?: number | bigint | null;
  subCaptainCnt?: number | bigint | null;
  otherPersonnelNorm?: number | bigint | null;
};

export type UseTypeState = [
  "edit" | "view",
  Dispatch<SetStateAction<"edit" | "view">>
];

export type FlightScaleData = {
  name?: string;
  index?: number;
  airplaneCnt?: number | bigint | null;
  minStandbyAirplaneCnt?: number | bigint | null;
  seatCnt?: number | bigint | null;
  requiredCaptainCnt?: number | bigint | null;
  requiredSubCaptainCnt?: number | bigint | null;
  requiredOtherPersonnelNorm?: number | bigint | null;
  requiredPreFlightHours?: number | bigint | null;
  requiredPostFlightHours?: number | bigint | null;
  minRequiredRevenue?: number | bigint | null;
};
export type FlightScaleDataWithId = FlightScaleData & {
  id: string;
};
export type UpdateFlightScaleDatas = {
  addFlightScaleDatas: FlightScaleData[];
  updateFlightScaleDatas: FlightScaleDataWithId[];
  removeFlightScaleDataIds: string[];
};
