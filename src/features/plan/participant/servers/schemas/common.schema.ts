import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";
import { PARTICIPANT_PERMISSION_VALUES } from "../../type";

extendZodWithOpenApi(z);

export const planPermissionSchema = z
  .array(z.enum(PARTICIPANT_PERMISSION_VALUES))
  .openapi({
    description: "権限",
    example: ["VIEW", "REQUEST", "INPUT", "EDIT"],
  });
export type PlanPermissionSchema = z.infer<typeof planPermissionSchema>;

export const insertOrUpdateParticipantSchema = z.array(
  z.object({
    user_id: userIdSchema,
    permission: planPermissionSchema,
  })
);
export type InsertOrUpdateParticipantSchema = z.infer<
  typeof insertOrUpdateParticipantSchema
>;
