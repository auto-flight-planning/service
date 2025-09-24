"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client/browser";
import { useUserStore } from "@/features/auth";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import { loginFormSchema, type LoginFormData } from "../schemas/formSchema";
import { GetEmployeeByIdResSchema } from "@/features/employee/server/schemas/res.schema";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";

export default function useLogin() {
  const formMethods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      employeeId: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setUser } = useUserStore();
  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: ({ userId, employeeId, firstName, lastName, email }) => {
      setUser({
        userId,
        employeeId,
        firstName,
        lastName,
        email,
      });
      addToast({
        type: "success",
        message: `${lastName} ${firstName} さん、システムへようこそ。`,
        title: "ログイン成功",
      });
      router.push("/home");
      closeModal();
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "ログインに失敗しました。",
        title: "ログイン失敗",
      });
    },
  });

  const { handleSubmit } = formMethods;
  const onValidSubmit = (data: LoginFormData) => login(data);
  const onSubmit = handleSubmit(onValidSubmit);

  return {
    formMethods,
    onSubmit,
    isPending,
  };
}

export async function loginAPI(data: LoginFormData) {
  try {
    const res = await apiFetchJson<GetEmployeeByIdResSchema>(
      `/api/employees/${data.employeeId}`
    );
    const employee = camelcaseKeys(res, { deep: true });

    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: employee.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { id, ...rest } = employee;
    return {
      userId: user!.id,
      employeeId: employee.id,
      ...rest,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
