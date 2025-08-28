import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/client/stores";
import { plan_notification } from "@/server/db/prisma/index.d";
import { useEffect, useState } from "react";

export default function useNotification() {
  const { user } = useUserStore();
  const [notifications, setNotifications] = useState<plan_notification[]>([]);

  const { mutate: getNotification, isPending } = useMutation({
    mutationFn: () => getNotificationAPI(user!.userId),
    onSuccess: (data) => {
      setNotifications(data);
    },
  });

  useEffect(() => {
    if (user) {
      getNotification();
    }
  }, [user]);

  return {
    notifications,
    isPending,
  };
}

const getNotificationAPI = async (
  userId: string
): Promise<plan_notification[]> => {
  const res = await fetch("/api/plan/notification/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    throw new Error("通知の取得に失敗しました");
  }
  return res.json();
};
