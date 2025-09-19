"use client";

import { useRouter } from "next/navigation";
import { useModalStore } from "@/features/modal";
import { WhiteCard } from "@/components/card";
import Notification from "@/features/plan/notification/get";

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
            新規計画
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            予測収益が高い新しい運航計画を作成する
          </p>
        </WhiteCard>
        <WhiteCard
          className="w-[50%] h-[275px] flex flex-col justify-center items-center"
          onClick={() => router.push("/planList")}
        >
          <span className="text-6xl mb-10 block">📋</span>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            既存計画
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            進行中または採択済みの運航計画を確認する
          </p>
        </WhiteCard>
      </div>
      <Notification />
    </div>
  );
}
