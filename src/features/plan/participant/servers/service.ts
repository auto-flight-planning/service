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
      participantDataList = await Promise.all(
        participants.map(async (p) => {
          const employee = await employeesRepo.findOneByUserId({
            userId: p.user_id,
          });
          if (!employee) {
            throw new NotFoundError("参加者の情報が見つかりません");
          }
          return {
            id: employee.id,
            lastName: employee.last_name,
            firstName: employee.first_name,
            email: employee.email,
            userId: employee.user_id,
            permission: p.permission as ParticipantPermissionEnum[],
          };
        })
      );
    }

    return getPlanParticipantsResSchema.parse({
      planId,
      creator,
      participantDataList,
    });
  },
};

export default planParticipantsService;
