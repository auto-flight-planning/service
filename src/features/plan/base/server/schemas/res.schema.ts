import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planParticipantDataListSchema, planSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const createPlanResSchema = planSchema.extend({
  participantDataList: planParticipantDataListSchema,
});
export type CreatePlanResSchema = z.infer<typeof createPlanResSchema>;
