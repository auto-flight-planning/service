import { z } from "zod";

export const editTitleFormSchema = z.object({
  title: z.string().min(1, "企画名を入力してください"),
});

export type EditTitleFormData = z.infer<typeof editTitleFormSchema>;
