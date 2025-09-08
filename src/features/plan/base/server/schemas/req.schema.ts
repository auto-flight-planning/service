import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planTargetDateSchema, planTitleSchema } from "./common.schema";
import { planParticipantDataListSchema } from "@/features/plan/participant/servers/schemas/common.schema";

extendZodWithOpenApi(z);

export const createPlanReqSchema = z.object({
  title: planTitleSchema,
  targetDate: planTargetDateSchema,
  participantDataList: planParticipantDataListSchema,
});
export type CreatePlanReqSchema = z.infer<typeof createPlanReqSchema>;
