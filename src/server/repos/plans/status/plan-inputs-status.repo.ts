import { Prisma } from "@/server/db/prisma";
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

  async updateOne({
    planId,
    data,
  }: {
    planId: string;
    data: Prisma.plan_inputs_statusUpdateInput;
  }) {
    return prismaClient.plan_inputs_status.update({
      where: { plan_id: planId },
      data,
    });
  },
};

export default planInputsStatusRepo;
