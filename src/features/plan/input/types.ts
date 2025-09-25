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
