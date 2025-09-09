import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { planPermissionSchema } from "./common.schema";
import { getEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";

extendZodWithOpenApi(z);

export const getPlanParticipantsResSchema = z.object({
  planId: planIdSchema,
  creator: getEmployeeByUserIdResSchema,
  participantDataList: z.array(
    getEmployeeByUserIdResSchema.extend({
      permission: planPermissionSchema,
    })
  ),
});
export type GetPlanParticipantsResSchema = z.infer<
  typeof getPlanParticipantsResSchema
>;
