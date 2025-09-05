"use client";

import { SquareButton } from "@/components/button";
import { useGetPlanInfo } from "@/client/features/plan/get/useGetPlanInfo";
import { useRouter } from "next/navigation";

interface SubmitButtonProps {
  planId: string;
}

export default function SubmitButton({ planId }: SubmitButtonProps) {
  const { data, isPending } = useGetPlanInfo(planId);
  const resultStatus = data?.status.result_status;
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <SquareButton
        text="結果確認"
        bold
        color="primary"
        size="large"
        disabled={isPending || resultStatus !== "generated"}
        isPending={resultStatus === "pending"}
        onClick={() => {
          router.push(`/plan/${planId}/result`);
        }}
      />
    </div>
  );
}
