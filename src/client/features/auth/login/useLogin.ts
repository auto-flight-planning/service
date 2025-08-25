import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUserStore, useToastStore, useModalStore } from "@/client/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormDataType } from "./schema";
import { useMutation } from "@tanstack/react-query";
import createBrowserClient from "@/server/supabase/browserClient";

export default function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      employeeId: "",
      password: "",
    },
  });

  const { setUser } = useUserStore();
  const { addToast } = useToastStore();
  const router = useRouter();
  const { closeModal } = useModalStore();

  const { mutate: login } = useMutation({
    mutationFn: loginAPI,
    onSuccess: ({ employeeId, firstName, lastName }) => {
      setUser({
        employeeId,
        firstName,
        lastName,
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
        message: error.message || "ログインに失敗しました。",
        title: "ログイン失敗",
      });
    },
  });

  const onValidSubmit = (data: LoginFormDataType) => {
    login(data);
  };

  return {
    register,
    errors,
    handleSubmit,
    onValidSubmit,
    login,
  };
}

export async function loginAPI(data: LoginFormDataType) {
  const employeeResponse = await fetch("/api/auth/check-employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId: data.employeeId }),
  });

  const responseData = await employeeResponse.json();
  if (responseData.error) {
    throw new Error(responseData.error);
  }

  const supabaseCli = createBrowserClient();
  const { data: authData, error } = await supabaseCli.auth.signInWithPassword({
    email: responseData.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    accessToken: authData.session.access_token,
    employeeId: responseData.employeeId,
    firstName: responseData.firstName,
    lastName: responseData.lastName,
  };
}
