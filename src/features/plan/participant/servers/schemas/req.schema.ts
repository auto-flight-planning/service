import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { userIdSchema } from "@/server/schemas/common.schema";
import { insertOrUpdateParticipantSchema } from "./common.schema";

extendZodWithOpenApi(z);

export const updateParticipantsReqSchema = z.object({
  add_participants: insertOrUpdateParticipantSchema,
  update_participants: insertOrUpdateParticipantSchema,
  remove_participant_ids: z.array(userIdSchema),
});
export type UpdateParticipantsReqSchema = z.infer<
  typeof updateParticipantsReqSchema
>;
