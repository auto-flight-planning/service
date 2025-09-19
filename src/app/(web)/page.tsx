import { LoginButton } from "@/features/auth";

export default function Start() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-700">運航計画システム</h1>
        <p className="text-lg text-gray-500">
          投入資源に対する予測収益が高い運航計画を自動作成するシステムへようこそ。
        </p>
      </div>
      <LoginButton />
    </>
  );
}
