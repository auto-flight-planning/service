import {
  plansRepo,
  planParticipantsRepo,
  planInputsStatusRepo,
  planInputsResourcesWorkforceRepo,
  planInputsResourcesFlightScalesRepo,
  planInputsAnalyticsRepo,
  planInputsAirportsRepo,
} from "@/server/repos/plans";
import { type ParticipantDataList } from "@/features/plan/participant/type";

const planService = {
  async createPlan({
    title,
    targetDate,
    creatorId,
    participantDataList,
  }: {
    creatorId: string;
    title: string;
    targetDate: string;
    participantDataList: ParticipantDataList;
  }) {
    // 1. planの生成
    const plan = await plansRepo.insertOne({
      title,
      targetDate: new Date(targetDate),
      creatorId,
    });

    // 2. 初期化 (並列処理)
    await Promise.all([
      await planParticipantsRepo.insertMany({
        planId: plan.id,
        participantDataList,
      }),
      planInputsStatusRepo.initOne({ planId: plan.id }),
      planInputsResourcesWorkforceRepo.initOne({ planId: plan.id }),
      planInputsAnalyticsRepo.initOne({ planId: plan.id }),
      planInputsAirportsRepo.initAll({ planId: plan.id }),
    ]);

    const planParticipants = await planParticipantsRepo.findManyByPlanId({
      planId: plan.id,
    });

    return {
      plan,
      planParticipants,
    };
  },
};

export default planService;
