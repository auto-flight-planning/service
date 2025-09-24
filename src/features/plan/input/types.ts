export type WorkforceData = {
  captainCnt?: number | bigint | null;
  subCaptainCnt?: number | bigint | null;
  otherPersonnelNorm?: number | bigint | null;
};

// legacy
export interface InputModalProps {
  type?: "view" | "edit";
}
