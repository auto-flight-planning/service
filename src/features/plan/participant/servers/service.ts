import { planParticipantsRepo } from "@/server/repos/plans";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { NotFoundError } from "@/server/lib/errors";
import { UpdateParticipantsReqSchema } from "./schemas/req.schema";
import { type ParticipantPermission } from "../type";
import { type plan_participants as PlanParticipants } from "@/server/db/prisma";
import { getRedisClient } from "@/lib/redis/client";
import { PlanParticipantsDto } from "./schemas/res.schema";

const planParticipantsService = {
  async getExtendedPlanParticipants({
    participants,
  }: {
    participants: PlanParticipants[];
  }) {
    const employees = await employeesRepo.findManyByUserIds({
      userIds: participants.map((p) => p.user_id),
    });

    const extendedParticipants = employees.map((e) => ({
      id: e.id,
      lastName: e.last_name,
      firstName: e.first_name,
      email: e.email,
      userId: e.user_id,
      permission: participants.find((p) => p.user_id === e.user_id)!
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
      const [_creator, participants] = await Promise.all([
        employeesRepo.findOneByUserId({ userId: creatorId }),
        planParticipantsRepo.findManyByPlanId({ planId }),
      ]);
      if (!_creator) {
        throw new NotFoundError("生成者が見つかりません");
      }
      const creator = {
        id: _creator.id,
        lastName: _creator.last_name,
        firstName: _creator.first_name,
        email: _creator.email,
        userId: _creator.user_id,
      };

      const extendedParticipants = await this.getExtendedPlanParticipants({
        participants,
      });

      planParticipants = {
        planId,
        creator,
        participantDataList: extendedParticipants,
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
    updateParticipantData: UpdateParticipantsReqSchema;
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

    return { planId, participantDataList: extendedParticipants };
  },
};

export default planParticipantsService;
