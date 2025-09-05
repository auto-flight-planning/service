"use client";

import NotificationHeader from "./notificationHeader";
import NotificationRow from "./notificationRow";
import useNotification from "./useNotification";
import { Spinner } from "@/components/spinner";
import { plan_notification } from "@/server/db/prisma/index.d";

export default function Notification() {
  const { notifications, isPending } = useNotification();
  const handleNotificationClick = (notification: plan_notification) => {
    console.log("Notification clicked:", notification);
    // TODO: 나중에 모달이나 페이지 이동 로직 추가
  };

  return (
    <div className="bg-primary-500 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg w-full">
      <NotificationHeader />

      <div className="bg-white h-72 max-h-72 overflow-y-auto scrollbar-custom">
        {isPending || !notifications ? (
          <div className="flex justify-center items-center h-full">
            <Spinner color="gray" size="lg" />
          </div>
        ) : (
          <>
            {notifications.length ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 sticky top-0 z-10">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-[18%]">
                      企画名
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-[13%]">
                      送信者
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-[53%]">
                      メッセージ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-[8%]">
                      受信日時
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide w-[8%]">
                      確認状況
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notifications?.map((notification: plan_notification) => (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-gray-500">通知がありません</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
