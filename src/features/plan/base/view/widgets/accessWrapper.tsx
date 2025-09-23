"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/auth";
import usePlanStore from "@/features/plan/stores/planStore";
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
  const { setPlanId } = usePlanStore();
  useEffect(() => {
    setPlanId(planId);
  }, []);

  const { participants } = useGetParticipants();
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
        message: "計画へのアクセス権限がありません。\nホーム画面へ移動します。",
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
