import { useSignUp } from ".";
import { TextField, SecretTextField } from "@/client/components/form";
import { SquareButton } from "@/client/components/button";

export default function LoginForm() {
  const { register, errors, handleSubmit, onValidSubmit, onInvalidSubmit } =
    useSignUp();

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
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
      <TextField
        label="氏名"
        {...register("name")}
        placeholder="氏名を入力してください"
        error={errors.name?.message}
      />
      <TextField
        label="メールアドレス"
        {...register("email")}
        placeholder="メールアドレスを入力してください"
        error={errors.email?.message}
      />
      <SquareButton text="会員登録" type="submit" size="large" fullWidth />
    </form>
  );
}
