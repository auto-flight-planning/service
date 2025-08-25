"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import createBrowserClient from "@/server/supabase/browserClient";
import { useToastStore, useUserStore } from "@/client/stores";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const supabaseBrowserClient = createBrowserClient();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToastStore();

  useEffect(() => {
    const { data: listener } = supabaseBrowserClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "INITIAL_SESSION" && session) {
          const res = await fetch("/api/auth/get-employee", {
            method: "POST",
            body: JSON.stringify({ userId: session.user.id }),
          });
          const { employeeId, firstName, lastName } = await res.json();

          setUser({
            employeeId,
            firstName,
            lastName,
          });

          if (pathname === "/") {
            router.push("/home");
          }
          addToast({
            type: "success",
            message: `${firstName} ${lastName} さん、システムへようこそ。`,
            title: "ログイン成功",
          });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/");
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [queryClient]);

  if (user === undefined) {
    return <LoadingScreen />;
  }
  return children;
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
