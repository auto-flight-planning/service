import { Prisma } from "@/server/db/prisma";
import { prismaClient } from "@/server/db/prismaClient";

const planInputsResourcesWorkforceRepo = {
  async initOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_workforce.create({
      data: { plan_id: planId },
    });
  },

  async findOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_workforce.findUnique({
      where: { plan_id: planId },
    });
  },

  async updateOne({
    planId,
    data,
  }: {
    planId: string;
    data: Prisma.plan_inputs_resources_workforceUpdateInput;
  }) {
    return prismaClient.plan_inputs_resources_workforce.update({
      where: { plan_id: planId },
      data,
    });
  },
};

export default planInputsResourcesWorkforceRepo;
