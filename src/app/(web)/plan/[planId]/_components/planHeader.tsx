"use client";

import { Spinner } from "@/components/spinner";
import { useGetPlanInfo } from "@/client/features/plan/get/useGetPlanInfo";
import { usePathname } from "next/navigation";

interface PlanHeaderProps {
  planId: string;
}

export default function PlanHeader({ planId }: PlanHeaderProps) {
  const pathname = usePathname();
  const { data, isPending, error } = useGetPlanInfo(planId);

  // input 하위 페이지들에서는 렌더링하지 않음
  const isInputSubPage =
    pathname.includes("/input/") &&
    (pathname.includes("/resource") ||
      pathname.includes("/analytics") ||
      pathname.includes("/airport"));

  if (isInputSubPage) {
    return null;
  }

  if (isPending || !data) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner size="lg" color="gray" />
      </div>
    );
  }

  // 진행 상태 계산
  const getProgressData = (step: string) => {
    switch (step) {
      case "input":
        return { currentStep: 1, progressWidth: "0%" };
      case "result":
        return { currentStep: 2, progressWidth: "33.33%" };
      case "review":
        return { currentStep: 3, progressWidth: "66.66%" };
      case "adoption":
        return { currentStep: 4, progressWidth: "100%" };
      default:
        return { currentStep: 1, progressWidth: "0%" };
    }
  };

  const { currentStep, progressWidth } = getProgressData(data.status.step);

  const steps = [
    { number: 1, label: "入力", key: "input" },
    { number: 2, label: "結果", key: "result" },
    { number: 3, label: "検討", key: "review" },
    { number: 4, label: "採択", key: "adoption" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start gap-10">
        {/* 프로젝트 정보 */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">
            {data.planName}
          </h1>
          <p className="text-gray-500 text-sm">
            対象期間: {data.year}年{data.month}月
          </p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex-1 min-w-96">
          <div className="relative flex items-center justify-between">
            {/* 진행 바 배경 */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-white/40 rounded-full z-10">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                style={{ width: progressWidth }}
              />
            </div>

            {/* 단계 원들 */}
            {steps.map((step) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const isAdopted = step.key === "adoption" && currentStep === 4;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center relative z-20"
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2
                      transition-all duration-300 border-2 shadow-lg backdrop-blur-sm
                      ${
                        isAdopted
                          ? "bg-gradient-to-br from-success-500 to-success-600 text-white border-success-500 shadow-success-500/40 animate-pulse"
                          : isActive
                          ? "bg-primary-500 text-white border-primary-500 scale-110 shadow-lg shadow-primary-500/50 animate-glow"
                          : isCompleted
                          ? "bg-primary-500 text-white border-primary-500 shadow-primary-500/30"
                          : "bg-white/70 text-gray-400 border-gray-300 shadow-gray-200"
                      }
                    `}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`
                      text-xs font-medium text-center
                      ${
                        isAdopted
                          ? "text-success-500 font-bold"
                          : isActive
                          ? "text-primary-500 font-bold"
                          : isCompleted
                          ? "text-primary-500"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
