"use client";

import { usePathname } from "next/navigation";
import useGetPlan from "../hooks/useGetPlan";
import DoubleSpinner from "@/components/spinner/doubleSpinner";
import Stepper from "../components/stepper";
import EditTitleButton from "../components/editTitleButton";
import { dateToYearMonthJP } from "@/lib/utils";
import { PlanStatusEnum } from "../../server/schemas/common.schema";

export default function HeaderWrapper({
  planId,
  children,
}: {
  planId: string;
  children: React.ReactNode;
}) {
  const { plan, isFetching } = useGetPlan(planId);

  const pathname = usePathname();
  const isInputSubPage = ["/resource", "/analytics", "/airport"].some(
    (subPage) => pathname.includes(subPage)
  );

  if (isInputSubPage) {
    return null;
  }
  if (isFetching || !plan) {
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
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">
              {plan.title}
            </h1>
            <EditTitleButton onClick={() => {}} />
          </div>
          <p className="text-gray-500 text-sm">
            対象期間: {dateToYearMonthJP(new Date(plan.targetDate))}
          </p>
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
