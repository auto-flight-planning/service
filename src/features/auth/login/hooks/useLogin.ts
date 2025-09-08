"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import getBrowserClient from "@/supabase/browserClient";
import { useUserStore } from "@/features/auth";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import { loginFormSchema, type LoginFormData } from "../schemas/formSchema";
import { GetEmployeeByIdResSchema } from "@/features/employee/server/schemas/res.schema";
import { errorResToMessage } from "@/lib/utils";

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
        message: `${firstName} ${lastName} さん、システムへようこそ。`,
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
    const res = await fetch(`/api/employees/${data.employeeId}`);
    if (!res.ok) {
      throw new Error(
        errorResToMessage(res, "GET /api/employees/{employeeId}")
      );
    }

    const employee: GetEmployeeByIdResSchema = await res.json();

    const supabase = await getBrowserClient();
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

    return {
      userId: user!.id,
      employeeId: employee.id,
      lastName: employee.lastName,
      firstName: employee.firstName,
      email: employee.email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
