import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";
import { insertOrUpdateParticipantSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const updateParticipantsReqSchema = z.object({
  addParticipants: insertOrUpdateParticipantSchema,
  updateParticipants: insertOrUpdateParticipantSchema,
  removeParticipantIds: z.array(userIdSchema),
});
export type UpdateParticipantsReqSchema = z.infer<
  typeof updateParticipantsReqSchema
>;
