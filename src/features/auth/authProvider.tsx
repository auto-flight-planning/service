"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@supabase/supabase-js";
import getBrowserClient from "@/supabase/browserClient";
import { useToastStore } from "@/features/toast/toastStore";
import { useUserStore } from "./userStore";
import { DoubleSpinner } from "@/components/spinner";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    let authSubscription: Subscription | null = null;

    const initAuthProvider = async () => {
      const supabaseBrowserClient = await getBrowserClient();
      const { data: listener } = supabaseBrowserClient.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "INITIAL_SESSION") {
            if (session) {
              const res = await fetch("/api/user/get-employee", {
                method: "POST",
                body: JSON.stringify({ userId: session.user.id }),
              });
              const { employeeId, firstName, lastName } = await res.json();

              setUser({
                userId: session.user.id,
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
            } else {
              setUser(null);
            }
          } else if (event === "SIGNED_OUT") {
            setUser(null);
            router.push("/");
          }
        }
      );
      authSubscription = listener.subscription;
    };

    initAuthProvider();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
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
      <DoubleSpinner />
    </div>
  );
}
