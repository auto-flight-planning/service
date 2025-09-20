import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { planPermissionSchema } from "./common.schema";
import { getEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";

extendZodWithOpenApi(z);

export const extendedPlanParticipantDataSchema = z.array(
  getEmployeeByUserIdResSchema.extend({
    permission: planPermissionSchema,
  })
);
export type ExtendedPlanParticipantDataSchema = z.infer<
  typeof extendedPlanParticipantDataSchema
>;

export const getPlanParticipantsResSchema = z.object({
  plan_id: planIdSchema,
  creator: getEmployeeByUserIdResSchema,
  participant_data_list: extendedPlanParticipantDataSchema,
});
export type GetPlanParticipantsResSchema = z.infer<
  typeof getPlanParticipantsResSchema
>;
export type PlanParticipantsDto = GetPlanParticipantsResSchema;

export const updatePlanParticipantsResSchema = z.object({
  plan_id: planIdSchema,
  participant_data_list: extendedPlanParticipantDataSchema,
});
export type UpdatePlanParticipantsResSchema = z.infer<
  typeof updatePlanParticipantsResSchema
>;
