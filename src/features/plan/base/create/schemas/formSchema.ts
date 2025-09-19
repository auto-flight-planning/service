import { z } from "zod";
import { participantsFieldSchema } from "@/features/plan/participant";

export const createPlanFormSchema = z.object({
  title: z.string().min(1, "計画名を入力してください"),
  year: z.string().min(1, "対象年を選択してください"),
  month: z.string().min(1, "対象月を選択してください"),
  participants: participantsFieldSchema,
});

export type CreatePlanFormData = z.infer<typeof createPlanFormSchema>;
