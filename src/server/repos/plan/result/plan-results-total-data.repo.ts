import { prismaClient } from "@/server/db/prismaClient";

export const planResultsTotalDataRepo = {
  async insertOne(planId: string, data: any) {
    return prismaClient.plan_results_total_data.create({
      data: {
        plan_id: planId,
        data,
      },
    });
  },

  async findOne(planId: string) {
    return prismaClient.plan_results_total_data.findUnique({
      where: { plan_id: planId },
    });
  },

  async updateOnePartial(planId: string, partialData: any) {
    const existing = await this.findOne(planId);
    return prismaClient.plan_results_total_data.update({
      where: { plan_id: planId },
      data: {
        data: {
          ...(existing?.data as object),
          ...partialData,
        },
      },
    });
  },

  async deleteOne(planId: string) {
    return prismaClient.plan_results_total_data.delete({
      where: { plan_id: planId },
    });
  },
};
