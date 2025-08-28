"use client";

import { useRouter } from "next/navigation";
import { useModalStore } from "@/client/stores";
import { WhiteCard } from "@/client/components/card";
import Notification from "@/client/features/plan/notification";

export default function Home() {
  const router = useRouter();
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-col gap-8 items-center w-[75%]">
      <div className="flex gap-8 w-full">
        <WhiteCard
          className="w-[50%] h-[275px] flex flex-col justify-center items-center"
          onClick={() => openModal("createPlan")}
        >
          <span className="text-6xl mb-10 block">✈️</span>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            新規企画
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            予測収益が高い新しい運航日程を企画する
          </p>
        </WhiteCard>
        <WhiteCard
          className="w-[50%] h-[275px] flex flex-col justify-center items-center"
          onClick={() => router.push("/planList")}
        >
          <span className="text-6xl mb-10 block">📋</span>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            既存企画
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            進行中または採択が完了した既存企画を確認する
          </p>
        </WhiteCard>
      </div>
      <Notification />
    </div>
  );
}
