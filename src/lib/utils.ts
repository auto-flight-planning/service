export const dateToString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const dateToYearMonthJP = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

export const errorResToMessage = (res: Response, endpoint: string) =>
  `(${res.status}) ${res.statusText}\n${endpoint} を呼び出しに失敗しました。`;
