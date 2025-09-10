"use client";

import { usePathname } from "next/navigation";
import useGetPlan from "../hooks/useGetPlan";
import { useUserStore } from "@/features/auth";
import { useModalStore } from "@/features/modal";
import DoubleSpinner from "@/components/spinner/doubleSpinner";
import { EditButton } from "@/components/button";
import Stepper from "../components/stepper";
import ParticipantButton from "../components/participantButton";
import { dateToYearMonthJP } from "@/lib/utils";
import { PlanStatusEnum } from "../../server/schemas/common.schema";

export default function HeaderWrapper({
  planId,
  children,
}: {
  planId: string;
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const { plan } = useGetPlan(planId);

  const pathname = usePathname();
  const isInputSubPage = ["/resource", "/analytics", "/airport"].some(
    (subPage) => pathname.includes(subPage)
  );

  const { openModal } = useModalStore();

  if (isInputSubPage) {
    return null;
  }
  if (!plan) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <DoubleSpinner />
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-8 w-full h-full">
      {/* header */}
      <section className="flex justify-between items-start gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-gray-700">{plan.title}</h1>
            {user!.userId === plan.creatorId && (
              <EditButton
                onClick={() =>
                  openModal("editTitle", {
                    planId,
                    defaultValue: { title: plan.title },
                  })
                }
              />
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-sm">
              対象期間: {dateToYearMonthJP(new Date(plan.targetDate))}
            </p>
            <ParticipantButton onClick={() => {}} />
          </div>
        </div>
        <div className="flex-1 min-w-96">
          <Stepper currentStatus={plan.status as PlanStatusEnum} />
        </div>
      </section>

      {/* content */}
      <section>{children}</section>
    </section>
  );
}
