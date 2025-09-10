import { PlanStatusEnum } from "../../server/schemas/common.schema";

const getCurrentProgress = (status: PlanStatusEnum) => {
  switch (status) {
    case PlanStatusEnum.INPUT:
      return { currentStep: 1, progressWidth: "0%" };
    case PlanStatusEnum.RESULT:
      return { currentStep: 2, progressWidth: "33.33%" };
    case PlanStatusEnum.REVIEW:
      return { currentStep: 3, progressWidth: "66.66%" };
    case PlanStatusEnum.ADOPTED:
      return { currentStep: 4, progressWidth: "100%" };
  }
};

const STEP_LIST = [
  { step: 1, label: "入力" },
  { step: 2, label: "結果" },
  { step: 3, label: "検討" },
  { step: 4, label: "採択" },
];

export default function Stepper({
  currentStatus,
}: {
  currentStatus: PlanStatusEnum;
}) {
  const { currentStep, progressWidth } = getCurrentProgress(currentStatus);
  const isAdopted = currentStep === 4;
  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute top-5 left-5 right-5 h-1 bg-white/40 rounded-full z-10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAdopted
              ? "bg-gradient-to-r from-primary-500 via-primary-500 to-green-500"
              : "bg-gradient-to-r from-primary-500 to-primary-600"
          }`}
          style={{ width: progressWidth }}
        />
      </div>

      {STEP_LIST.map(({ step, label }) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isAdoptedStep = isAdopted && step === 4;

        return (
          <div key={label} className="flex flex-col items-center relative z-20">
            <div
              className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2
            transition-all duration-300 border-2 shadow-lg backdrop-blur-sm
            ${
              isAdoptedStep
                ? "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-green-500/40 animate-glow-green"
                : isActive
                ? "bg-primary-500 text-white border-primary-500 scale-110 shadow-lg shadow-primary-500/50 animate-glow-primary"
                : isCompleted
                ? "bg-primary-500 text-white border-primary-500 shadow-primary-500/30"
                : "bg-white/70 text-gray-400 border-gray-300 shadow-gray-200"
            }
          `}
            >
              {step}
            </div>
            <span
              className={`
            text-xs font-medium text-center
            ${
              isAdoptedStep
                ? "text-green-500 font-bold"
                : isActive
                ? "text-primary-500 font-bold"
                : isCompleted
                ? "text-primary-500"
                : "text-gray-500"
            }
          `}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
