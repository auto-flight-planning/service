import { useLogin } from ".";
import { TextField, SecretTextField } from "@/client/components/form";
import { SquareButton } from "@/client/components/button";
import { FormProvider } from "react-hook-form";

export default function LoginForm() {
  const { formMethods, onValidSubmit } = useLogin();
  const { handleSubmit } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="flex flex-col gap-6"
      >
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
        <SquareButton text="ログイン" type="submit" size="large" fullWidth />
      </form>
    </FormProvider>
  );
}
