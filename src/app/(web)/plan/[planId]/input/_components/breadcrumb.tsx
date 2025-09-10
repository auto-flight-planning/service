"use client";

import { useRouter, usePathname } from "next/navigation";
// import { useGetPlanInfo } from "@/features/plan/base/get/one/useGetPlanInfo";
import { BackButton } from "@/components/button";

interface BreadcrumbProps {
  planId: string;
}

const getPageTitle = (pathname: string) => {
  if (pathname.includes("/resource")) return "自社資源データ";
  if (pathname.includes("/analytics")) return "運航日程企画のための分析データ";
  if (pathname.includes("/airport")) return "連携空港の運航日程データ";
  return "入力段階";
};

export default function Breadcrumb({ planId }: BreadcrumbProps) {
  return null;
  // const router = useRouter();
  // const pathname = usePathname();
  // const { data, isPending } = useGetPlanInfo(planId);

  // // input 하위 페이지들에서만 표시
  // const shouldShowBreadcrumb =
  //   pathname.includes("/input/") &&
  //   (pathname.includes("/resource") ||
  //     pathname.includes("/analytics") ||
  //     pathname.includes("/airport"));

  // if (!shouldShowBreadcrumb) {
  //   return null;
  // }

  // if (isPending || !data) {
  //   return null;
  // }

  // const currentPageTitle = getPageTitle(pathname);

  // return (
  //   <div className="flex items-center gap-3 mb-6 text-sm">
  //     {/* 뒤로가기 버튼 */}
  //     <BackButton onClick={() => router.push(`/plan/${planId}/input`)} />

  //     {/* 브레드크럼 텍스트 */}
  //     <span className="text-primary-500 font-medium">{data.planName}</span>
  //     <span className="text-gray-400">/</span>
  //     <span className="text-gray-600">入力段階</span>
  //     <span className="text-gray-400">/</span>
  //     <span className="text-gray-800 font-medium">{currentPageTitle}</span>
  //   </div>
  // );
}
