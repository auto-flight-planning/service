import { prismaClient } from "@/server/db/prismaClient";
import { type InsertOrUpdateParticipantSchema } from "@/features/plan/participant/servers/schemas/common.schema";

const planParticipantsRepo = {
  async insertMany({
    planId,
    participantDataList,
  }: {
    planId: string;
    participantDataList: InsertOrUpdateParticipantSchema;
  }) {
    return prismaClient.plan_participants.createMany({
      data: participantDataList.map(({ userId, permission }) => ({
        plan_id: planId,
        user_id: userId,
        permission,
      })),
    });
  },

  async findManyByPlanId({ planId }: { planId: string }) {
    return prismaClient.plan_participants.findMany({
      where: { plan_id: planId },
    });
  },

  async updateMany({
    planId,
    participantDataList,
  }: {
    planId: string;
    participantDataList: InsertOrUpdateParticipantSchema;
  }) {
    const updatePromises = participantDataList.map(({ userId, permission }) =>
      prismaClient.plan_participants.update({
        where: {
          plan_id_user_id: {
            plan_id: planId,
            user_id: userId,
          },
        },
        data: { permission },
      })
    );

    return Promise.all(updatePromises);
  },

  async deleteManyByPlanId({ planId }: { planId: string }) {
    return prismaClient.plan_participants.deleteMany({
      where: { plan_id: planId },
    });
  },

  async deleteManyByUserIdList({
    planId,
    userIdList,
  }: {
    planId: string;
    userIdList: string[];
  }) {
    return prismaClient.plan_participants.deleteMany({
      where: { plan_id: planId, user_id: { in: userIdList } },
    });
  },
};

export default planParticipantsRepo;
