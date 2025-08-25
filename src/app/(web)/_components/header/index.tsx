"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/client/stores";
import LogoutButton from "./logoutButton";

export default function Header() {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <section className="bg-white h-14 flex justify-between items-center px-4 shadow-md">
      <h1
        className="bg-gradient-to-r from-[#8992a4] to-[#a8b2c4] bg-clip-text text-transparent text-xl font-semibold tracking-wider cursor-pointer"
        onClick={() => router.push("/")}
      >
        運航日程企画システム
      </h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm font-medium relative border-b border-gray-300">
            {user.lastName} {user.firstName} さん
          </span>
          <LogoutButton />
        </div>
      )}
    </section>
  );
}
