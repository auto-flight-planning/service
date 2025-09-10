import { planParticipantsRepo, plansRepo } from "@/server/repos/plans";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { NotFoundError } from "@/server/lib/errors";
import {
  GetPlanParticipantsResSchema,
  getPlanParticipantsResSchema,
} from "./schemas/res.schema";
import { ParticipantPermissionEnum } from "../type";

const planParticipantsService = {
  async getPlanParticipants({ planId }: { planId: string }) {
    const plan = await plansRepo.findOne({ id: planId });
    if (!plan) {
      throw new NotFoundError("企画が見つかりません");
    }

    const [_creator, participants] = await Promise.all([
      employeesRepo.findOneByUserId({ userId: plan.creator_id }),
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

    let participantDataList: GetPlanParticipantsResSchema["participantDataList"] =
      [];
    if (participants.length > 0) {
      const employees = await employeesRepo.findManyByUserIds({
        userIds: participants.map((p) => p.user_id),
      });
      participantDataList = employees.map((e) => ({
        id: e.id,
        lastName: e.last_name,
        firstName: e.first_name,
        email: e.email,
        userId: e.user_id,
        permission: participants.find((p) => p.user_id === e.user_id)!
          .permission as ParticipantPermissionEnum[],
      }));
    }

    return getPlanParticipantsResSchema.parse({
      planId,
      creator,
      participantDataList,
    });
  },

  async updatePlanParticipants({
    planId,
    updateParticipantData,
  }: {
    planId: string;
    updateParticipantData: any;
  }) {},
};

export default planParticipantsService;
