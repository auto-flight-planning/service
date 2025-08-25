import { useLogin } from ".";
import { TextField, SecretTextField } from "@/client/components/form";
import { SquareButton } from "@/client/components/button";

export default function LoginForm() {
  const { register, errors, handleSubmit, onValidSubmit } = useLogin();

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      className="flex flex-col gap-6"
    >
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
      <SquareButton text="ログイン" type="submit" size="large" fullWidth />
    </form>
  );
}
