import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema, userIdSchema } from "@/server/schemas/common.schema";
import { ParticipantPermissionEnum } from "../../type";

extendZodWithOpenApi(z);

export const planPermissionSchema = z
  .array(z.enum(ParticipantPermissionEnum))
  .openapi({
    description: "権限",
    example: ["VIEW", "REQUEST", "INPUT", "EDIT"],
  });
export type PlanPermissionSchema = z.infer<typeof planPermissionSchema>;

export const planParticipantDataListSchema = z.array(
  z.object({
    userId: userIdSchema,
    permission: planPermissionSchema,
  })
);
export type PlanParticipantDataListSchema = z.infer<
  typeof planParticipantDataListSchema
>;
