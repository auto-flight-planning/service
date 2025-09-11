import { prismaClient } from "@/server/db/prismaClient";

const planInputsStatusRepo = {
  async initOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_status.create({
      data: { plan_id: planId },
    });
  },

  async findOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_status.findUnique({
      where: { plan_id: planId },
    });
  },
};

export default planInputsStatusRepo;
