"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/auth";
import { useGetParticipants } from "@/features/plan/participant";
import { useToastStore } from "@/features/toast";
import { DoubleSpinner } from "@/components/spinner";
import { checkPlanParticipantsPermission } from "@/lib/utils";

export default function AccessWrapper({
  planId,
  children,
}: {
  planId: string;
  children: React.ReactNode;
}) {
  const { participants } = useGetParticipants(planId);
  const { user } = useUserStore();

  const hasAccess: boolean | undefined = useMemo(() => {
    if (!participants || !user) return undefined;
    return checkPlanParticipantsPermission({
      planParticipants: participants,
      userId: user.userId,
      type: "VIEW",
    });
  }, [participants, user]);

  const { addToast } = useToastStore();
  const router = useRouter();
  useEffect(() => {
    if (hasAccess === false) {
      addToast({
        type: "error",
        title: "接近権限なし",
        message: "企画に接近権限がありません。\nホームページに遷移します。",
      });
      router.push("/home");
    }
  }, [hasAccess]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      {hasAccess === undefined ? (
        <DoubleSpinner />
      ) : hasAccess === false ? null : (
        children
      )}
    </div>
  );
}
