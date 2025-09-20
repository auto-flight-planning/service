import { planParticipantsRepo } from "@/server/repos/plans";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { NotFoundError } from "@/server/lib/errors";
import { type ParticipantDataList, type ParticipantPermission } from "../type";
import { type plan_participants as PlanParticipants } from "@/server/db/prisma";
import { getRedisClient } from "@/server/redis/client";
import { type PlanParticipantsDto } from "./schemas/res.schema";

const planParticipantsService = {
  async getExtendedPlanParticipants({
    participants,
  }: {
    participants: PlanParticipants[];
  }) {
    const employees = await employeesRepo.findManyByUserIds({
      userIds: participants.map((p) => p.user_id),
    });

    const extendedParticipants = employees.map(({ created_at, ...rest }) => ({
      ...rest,
      permission: participants.find((p) => p.user_id === rest.user_id)!
        .permission as ParticipantPermission[],
    }));
    return extendedParticipants;
  },

  async getPlanParticipants({
    planId,
    creatorId,
  }: {
    planId: string;
    creatorId: string;
  }) {
    const redisClient = await getRedisClient();

    let planParticipants: PlanParticipantsDto | null = null;
    const cachedPlanParticipants = await redisClient.get(
      `plan_participants:${planId}`
    );

    if (cachedPlanParticipants) {
      planParticipants = JSON.parse(
        cachedPlanParticipants
      ) as PlanParticipantsDto;
    } else {
      const [creator, participants] = await Promise.all([
        employeesRepo.findOneByUserId({ userId: creatorId }),
        planParticipantsRepo.findManyByPlanId({ planId }),
      ]);
      if (!creator) {
        throw new NotFoundError("生成者が見つかりません");
      }
      const { created_at, ...creatorRest } = creator;

      const extendedParticipants = await this.getExtendedPlanParticipants({
        participants,
      });

      planParticipants = {
        plan_id: planId,
        creator: creatorRest,
        participant_data_list: extendedParticipants,
      };
      await redisClient.set(
        `plan_participants:${planId}`,
        JSON.stringify(planParticipants),
        { EX: 60 * 30 }
      );
    }

    return planParticipants;
  },

  async updatePlanParticipants({
    planId,
    updateParticipantData,
  }: {
    planId: string;
    updateParticipantData: {
      addParticipants: ParticipantDataList;
      updateParticipants: ParticipantDataList;
      removeParticipantIds: string[];
    };
  }) {
    const { addParticipants, updateParticipants, removeParticipantIds } =
      updateParticipantData;

    await Promise.all([
      planParticipantsRepo.insertMany({
        planId,
        participantDataList: addParticipants,
      }),
      planParticipantsRepo.updateMany({
        planId,
        participantDataList: updateParticipants,
      }),
      planParticipantsRepo.deleteManyByUserIdList({
        planId,
        userIdList: removeParticipantIds,
      }),
    ]);

    const updatedParticipants = await planParticipantsRepo.findManyByPlanId({
      planId,
    });
    const extendedParticipants = await this.getExtendedPlanParticipants({
      participants: updatedParticipants,
    });

    const redisClient = await getRedisClient();
    await redisClient.del(`plan_participants:${planId}`);

    return { plan_id: planId, participant_data_list: extendedParticipants };
  },
};

export default planParticipantsService;
