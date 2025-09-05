import { useLogin } from ".";
import { TextField, SecretTextField } from "@/components/form";
import { SquareButton } from "@/components/button";
import { FormProvider } from "react-hook-form";

export default function LoginForm() {
  const { formMethods, onValidSubmit, isPending } = useLogin();
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
        <SquareButton
          text="ログイン"
          type="submit"
          size="large"
          fullWidth
          isPending={isPending}
        />
      </form>
    </FormProvider>
  );
}
