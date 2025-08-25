import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToastStore } from "@/client/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormDataType } from "./schema";

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

  const router = useRouter();
  const { addToast } = useToastStore();
  const onValidSubmit = (data: LoginFormDataType) => {
    console.log("valid", data);
    addToast({
      type: "success",
      title: "ログイン成功",
      message: "ログインに成功しました。",
    });
    // router.push("/home");
  };

  return {
    register,
    errors,
    handleSubmit,
    onValidSubmit,
  };
}
