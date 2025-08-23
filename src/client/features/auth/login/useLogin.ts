import { useForm } from "react-hook-form";
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

  const onValidSubmit = (data: LoginFormDataType) => {
    console.log("valid", data);
  };

  const onInvalidSubmit = () => {
    console.log("invalid");
  };

  return {
    register,
    errors,
    handleSubmit,
    onValidSubmit,
    onInvalidSubmit,
  };
}
