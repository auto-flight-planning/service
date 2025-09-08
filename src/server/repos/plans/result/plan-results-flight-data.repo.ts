import { prismaClient } from "@/server/db/prismaClient";

const planResultsFlightDataRepo = {
  async insertMany(planId: string, data: any) {
    return prismaClient.plan_results_flights_data.createMany({
      data: { plan_id: planId, data },
    });
  },

  async findOne(id: string) {
    return prismaClient.plan_results_flights_data.findUnique({
      where: { id },
    });
  },

  async updateOnePartial(id: string, partialData: any) {
    const existing = await this.findOne(id);
    return prismaClient.plan_results_flights_data.update({
      where: { id },
      data: { data: { ...(existing?.data as object), ...partialData } },
    });
  },

  async deleteAll(planId: string) {
    return prismaClient.plan_results_flights_data.deleteMany({
      where: { plan_id: planId },
    });
  },
};

export default planResultsFlightDataRepo;
