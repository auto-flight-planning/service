import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  planTargetDateSchema,
  planTitleSchema,
  planParticipantDataListSchema,
} from "./common.schema";

extendZodWithOpenApi(z);

export const createPlanReqSchema = z.object({
  title: planTitleSchema,
  targetDate: planTargetDateSchema,
  participantDataList: planParticipantDataListSchema,
});
export type CreatePlanReqSchema = z.infer<typeof createPlanReqSchema>;
