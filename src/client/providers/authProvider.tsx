"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import createBrowserClient from "@/server/supabase/browserClient";
import { useToastStore, useUserStore } from "@/client/stores";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const supabaseBrowserClient = createBrowserClient();
  const { setUser, clearUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToastStore();

  useEffect(() => {
    const { data: listener } = supabaseBrowserClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === "INITIAL_SESSION" && session) {
          console.log("hi", session.user.identities?.[0].identity_data);
          const { employee_id, first_name, last_name } =
            session.user.identities?.[0].identity_data || {};
          setUser({
            employeeId: employee_id,
            firstName: first_name,
            lastName: last_name,
          });

          if (pathname === "/") {
            router.push("/home");
          }
          addToast({
            type: "success",
            message: `${first_name} ${last_name} さん、システムへようこそ。`,
            title: "ログイン成功",
          });
        } else if (event === "SIGNED_OUT") {
          clearUser();
          router.push("/");
        }
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [queryClient]);

  return children;
}
