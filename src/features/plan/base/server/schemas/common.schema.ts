import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";

extendZodWithOpenApi(z);

export enum PermissionEnum {
  VIEW = "VIEW",
  REQUEST = "REQUEST",
  INPUT = "INPUT",
  EDIT = "EDIT",
}

export enum PlanStatusEnum {
  INPUT = "INPUT",
  RESULT = "RESULT",
  REVIEW = "REVIEW",
  ADOPTED = "ADOPTED",
}

export const planTitleSchema = z.string().min(1).openapi({
  description: "企画名",
  example: "2028年9月運航企画",
});

export const planTargetDateSchema = z.date().min(new Date()).openapi({
  description: "対象年月",
  example: "2028-09-01",
});

export const planParticipantDataListSchema = z.array(
  z.object({
    userId: userIdSchema,
    permission: z.array(z.enum(PermissionEnum)).openapi({
      description: "権限",
      example: ["VIEW", "REQUEST", "INPUT", "EDIT"],
    }),
  })
);

export type PlanTitleSchema = z.infer<typeof planTitleSchema>;
export type PlanTargetDateSchema = z.infer<typeof planTargetDateSchema>;
export type PlanParticipantDataListSchema = z.infer<
  typeof planParticipantDataListSchema
>;
