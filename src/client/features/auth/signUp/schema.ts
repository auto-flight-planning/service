import { z } from "zod";

export const signUpSchema = z.object({
  employeeId: z.string().min(1, "社員IDを入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "パスワードは英字と数字を含む必要があります"
    ),
  name: z.string().min(1, "氏名を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
});

export type SignUpFormDataType = z.infer<typeof signUpSchema>;
