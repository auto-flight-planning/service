import { prismaClient } from "@/server/db/prismaClient";

export const planResultsDailyDataRepo = {
  async insertMany(planId: string, day: number, data: any) {
    return prismaClient.plan_results_daily_data.create({
      data: { plan_id: planId, day, data },
    });
  },

  async findOne(planId: string, day: number) {
    return prismaClient.plan_results_daily_data.findUnique({
      where: { plan_id: planId, day },
    });
  },

  async updateOnePartial(planId: string, day: number, partialData: any) {
    const existing = await this.findOne(planId, day);
    return prismaClient.plan_results_daily_data.update({
      where: { plan_id: planId, day },
      data: {
        data: {
          ...(existing?.data as object),
          ...partialData,
        },
      },
    });
  },

  async deleteAll(planId: string) {
    return prismaClient.plan_results_daily_data.deleteMany({
      where: { plan_id: planId },
    });
  },
};
