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

  const onSubmit = (data: LoginFormDataType) => {
    console.log(data);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
}
