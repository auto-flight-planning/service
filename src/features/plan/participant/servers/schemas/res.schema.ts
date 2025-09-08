import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema, userIdSchema } from "@/server/schemas/common.schema";
import { planPermissionSchema } from "./common.schema";

extendZodWithOpenApi(z);

const getPlanParticipantsResSchema = z.array(
  z.object({
    planId: planIdSchema,
    userId: userIdSchema,
    permission: planPermissionSchema,
  })
);
export type GetPlanParticipantsResSchema = z.infer<
  typeof getPlanParticipantsResSchema
>;
