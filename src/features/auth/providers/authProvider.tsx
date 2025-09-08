"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Subscription } from "@supabase/supabase-js";
import getBrowserClient from "@/supabase/browserClient";
import { useToastStore } from "@/features/toast/stores/toastStore";
import useUserStore from "../stores/userStore";
import { DoubleSpinner } from "@/components/spinner";
import { GetEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";

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
              if (process.env.NODE_ENV === "development") {
                console.log("console in dev mode \nsession : ", session);
              }

              const res = await fetch(
                `/api/employees?userId=${session.user.id}`
              );
              const employee: GetEmployeeByUserIdResSchema = await res.json();

              const { id, userId, firstName, lastName, email } = employee;
              setUser({
                userId,
                employeeId: id,
                firstName,
                lastName,
                email,
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
