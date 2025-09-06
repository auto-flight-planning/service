import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import createBrowserClient from "@/supabase/browserClient";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import { loginSchema, LoginFormDataType } from "../schemas/formSchema";
import { useUserStore } from "@/features/auth";

export default function useLogin() {
  const formMethods = useForm<LoginFormDataType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
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
    onSuccess: ({ userId, employeeId, firstName, lastName }) => {
      setUser({
        userId,
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
    formMethods,
    onValidSubmit,
    isPending,
  };
}

export async function loginAPI(data: LoginFormDataType) {
  const employeeResponse = await fetch("/api/user/check-employee", {
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
    userId: authData.user.id,
    employeeId: responseData.employeeId,
    firstName: responseData.firstName,
    lastName: responseData.lastName,
  };
}
