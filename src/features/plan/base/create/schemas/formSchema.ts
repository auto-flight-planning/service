import { z } from "zod";
import { PermissionEnum } from "../../server/schemas/common.schema";

export const createPlanFormSchema = z.object({
  title: z.string().min(1, "企画名を入力してください"),
  year: z.string().min(1, "対象年を選択してください"),
  month: z.string().min(1, "対象月を選択してください"),
  participants: z.array(
    z.object({
      userId: z.uuid(),
      lastName: z.string(),
      firstName: z.string(),
      permission: z.array(z.enum(PermissionEnum)),
    })
  ),
});

export type CreatePlanFormData = z.infer<typeof createPlanFormSchema>;
