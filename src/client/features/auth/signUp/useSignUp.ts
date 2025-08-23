import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormDataType } from "./schema";

export default function useSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormDataType>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      employeeId: "",
      password: "",
      name: "",
      email: "",
    },
  });

  const onValidSubmit = (data: SignUpFormDataType) => {
    console.log("valid", data);
  };

  const onInvalidSubmit = (errors: FieldErrors<SignUpFormDataType>) => {
    console.log("invalid", errors);
  };

  return {
    register,
    errors,
    handleSubmit,
    onValidSubmit,
    onInvalidSubmit,
  };
}
