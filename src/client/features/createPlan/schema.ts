import { z } from "zod";

export const createPlanSchema = z.object({
  planName: z.string().min(1, "企画名を入力してください"),
  year: z.string().min(1, "対象年を選択してください"),
  month: z.string().min(1, "対象月を選択してください"),
  participants: z.array(
    z.object({
      userId: z.string(),
      lastName: z.string(),
      firstName: z.string(),
    })
  ),
});

export type CreatePlanFormDataType = z.infer<typeof createPlanSchema>;
