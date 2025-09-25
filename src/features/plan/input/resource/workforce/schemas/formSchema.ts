import { z } from "zod";
import { positiveNumberSchema } from "@/lib/schema";

export const workforceFormSchema = z.object({
  captainCnt: positiveNumberSchema,
  subCaptainCnt: positiveNumberSchema,
  otherPersonnelNorm: positiveNumberSchema,
});
export type WorkforceFormData = z.infer<typeof workforceFormSchema>;
