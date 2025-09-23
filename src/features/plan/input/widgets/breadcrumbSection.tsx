"use client";

import { usePathname } from "next/navigation";
import { usePlanId } from "@/features/plan/stores/planStore";
import { useGetPlan } from "@/features/plan/base/view";
import Breadcrumb from "../components/breadcrumb";
import { INPUT_CATEGORY_LABELS } from "@/features/plan/input/constant";

export default function BreadcrumbSection() {
  const planId = usePlanId();
  const { plan } = useGetPlan();

  // TODO : 나중에 외부 입력자일 때는 BreadCrumb 안 보이도록
  const pathname = usePathname();
  const isInputSubPage = ["/resource", "/analytics", "/airport"].some(
    (subPage) => pathname.includes(subPage)
  );

  const dataName = pathname.split("/").pop()!.toUpperCase();
  const dataNameLabel =
    INPUT_CATEGORY_LABELS[dataName as keyof typeof INPUT_CATEGORY_LABELS];

  if (!isInputSubPage) {
    return null;
  }
  return (
    <Breadcrumb
      planId={planId}
      planTitle={plan!.title}
      dataName={dataNameLabel}
    />
  );
}
