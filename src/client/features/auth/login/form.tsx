import { useLogin } from ".";
import { TextField, SecretTextField } from "@/client/components/form";

export default function LoginForm() {
  const { register, errors, handleSubmit, onSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        label="社員ID"
        {...register("employeeId")}
        placeholder="社員IDを入力してください"
        error={errors.employeeId?.message}
      />
      <SecretTextField
        label="パスワード"
        {...register("password")}
        placeholder="パスワードを入力してください"
        error={errors.password?.message}
      />
    </form>
  );
}
