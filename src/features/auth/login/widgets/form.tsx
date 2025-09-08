import { FormProvider } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import { TextField, SecretTextField } from "@/components/form";
import { SquareButton } from "@/components/button";

export default function LoginForm() {
  const { formMethods, onSubmit, isPending } = useLogin();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <TextField
          label="社員ID"
          name="employeeId"
          placeholder="社員IDを入力してください"
        />
        <SecretTextField
          label="パスワード"
          name="password"
          placeholder="パスワードを入力してください"
        />
        <SquareButton
          text="ログイン"
          type="submit"
          size="large"
          fullWidth
          onLoading={isPending}
        />
      </form>
    </FormProvider>
  );
}
