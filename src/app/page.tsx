import { LoginButton } from "./_components";

export default function Start() {
  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-56px)]">
      <div className="flex flex-col items-center justify-center gap-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-700">
          運航日程企画システム
        </h1>
        <p className="text-lg text-gray-500">
          投入資源に対する予測収益の高い運航日程を自動企画するシステムへようこそ。
        </p>
      </div>
      <LoginButton />
    </section>
  );
}
