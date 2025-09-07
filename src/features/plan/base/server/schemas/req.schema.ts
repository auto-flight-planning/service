import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planParticipantDataListSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const createPlanReqSchema = z.object({
  title: z.string().min(1).openapi({
    description: "企画名",
    example: "2028年9月運航企画",
  }),
  targetDate: z.date().min(new Date()).openapi({
    description: "対象年月",
    example: "2028-09-01",
  }),
  participantDataList: planParticipantDataListSchema,
});

export type CreatePlanReqSchema = z.infer<typeof createPlanReqSchema>;
