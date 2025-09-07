import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { planIdSchema } from "@/server/schemas/common.schema";
import { USER_ID_EXAMPLE } from "@/constants/openapi.example";
import {
  planTitleSchema,
  planTargetDateSchema,
  PlanStatusEnum,
  planParticipantDataListSchema,
} from "./common.schema";

extendZodWithOpenApi(z);

export const createPlanResSchema = z.object({
  id: planIdSchema,
  creatorId: z.uuid().openapi({
    description: "企画生成者(責任者)のID",
    example: USER_ID_EXAMPLE,
  }),
  title: planTitleSchema,
  targetDate: planTargetDateSchema,
  status: z.enum(PlanStatusEnum).openapi({
    description: "企画の進捗ステータス",
    example: "INPUT",
  }),
  participantDataList: planParticipantDataListSchema,
});

export type CreatePlanResSchema = z.infer<typeof createPlanResSchema>;
