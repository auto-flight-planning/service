import { prismaClient } from "@/server/db/prismaClient";

const planInputsAnalyticsRepo = {
  async initOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_analytics.create({
      data: { plan_id: planId },
    });
  },
};

export default planInputsAnalyticsRepo;
