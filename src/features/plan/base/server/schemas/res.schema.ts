import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planSchema } from "./common.schema";
import { insertOrUpdateParticipantSchema } from "@/features/plan/participant/servers/schemas/common.schema";

extendZodWithOpenApi(z);

export const createPlanResSchema = planSchema.extend({
  participantDataList: insertOrUpdateParticipantSchema,
});
export type CreatePlanResSchema = z.infer<typeof createPlanResSchema>;
