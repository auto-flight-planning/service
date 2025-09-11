export enum StatusEnum {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface ListDataItem {
  status: StatusEnum;
  label: string;
}
