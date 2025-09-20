import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planTargetDateSchema, planTitleSchema } from "./common.schema";
import { insertOrUpdateParticipantSchema } from "@/features/plan/participant/servers/schemas/common.schema";

extendZodWithOpenApi(z);

export const createPlanReqSchema = z.object({
  title: planTitleSchema,
  target_date: planTargetDateSchema,
  participant_data_list: insertOrUpdateParticipantSchema,
});
export type CreatePlanReqSchema = z.infer<typeof createPlanReqSchema>;

export const updatePlanTitleReqSchema = z.object({
  title: planTitleSchema,
});
export type UpdatePlanTitleReqSchema = z.infer<typeof updatePlanTitleReqSchema>;
