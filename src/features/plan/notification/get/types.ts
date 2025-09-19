export interface NotificationData {
  id: string;
  planName: string;
  sender: string;
  message: string;
  receivedAt: string;
  isConfirmed: boolean;
}

export const mockNotifications: NotificationData[] = [
  {
    id: "1",
    planName: "2026.02運航計画",
    sender: "財務部",
    message: "一次検討を完了いたしました。ご確認ほどよろしくお願いいたします。",
    receivedAt: "2025.10.05 09:50",
    isConfirmed: false,
  },
  {
    id: "2",
    planName: "2026.02運航計画",
    sender: "運航本部総括部",
    message: "検討結果を作成しました。",
    receivedAt: "2025.10.05 09:24",
    isConfirmed: true,
  },
  // {
  //   id: "3",
  //   planName: "2026.01運航計画",
  //   sender: "財務部",
  //   message: "二次検討を完了いたしました。ご確認ほどよろしくお願いいたします。",
  //   receivedAt: "2025.10.02 13:08",
  //   isConfirmed: false,
  // },
  // {
  //   id: "4",
  //   planName: "2026.01運航計画",
  //   sender: "運航本部総括部",
  //   message: "ご確認お願いします。",
  //   receivedAt: "2025.10.01 18:22",
  //   isConfirmed: true,
  // },
  // {
  //   id: "5",
  //   planName: "2025.12運航計画",
  //   sender: "財務部",
  //   message: "三次検討を完了いたしました。ご確認ほどよろしくお願いいたします。",
  //   receivedAt: "2025.09.28 11:00",
  //   isConfirmed: false,
  // },
  // {
  //   id: "6",
  //   planName: "2025.12運航計画",
  //   sender: "運航本部総括部",
  //   message: "検討結果が届きました",
  //   receivedAt: "2025.09.27 09:44",
  //   isConfirmed: true,
  // },
];
