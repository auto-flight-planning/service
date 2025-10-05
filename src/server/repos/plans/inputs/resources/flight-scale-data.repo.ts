import { Prisma } from "@/server/db/prisma";
import { prismaClient } from "@/server/db/prismaClient";

const planInputsResourcesFlightScaleDataRepo = {
  async insertMany({
    flightScaleDatas,
  }: {
    flightScaleDatas: Prisma.plan_inputs_resources_flight_scale_dataCreateManyInput[];
  }) {
    return prismaClient.plan_inputs_resources_flight_scale_data.createMany({
      data: flightScaleDatas,
    });
  },

  async findAllByPlanId({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_flight_scale_data.findMany({
      where: { plan_id: planId },
    });
  },

  async updateMany({
    flightScaleDatas,
  }: {
    flightScaleDatas: Prisma.plan_inputs_resources_flight_scale_dataUpdateInput[];
  }) {
    const updatePromises = flightScaleDatas.map((data) =>
      prismaClient.plan_inputs_resources_flight_scale_data.update({
        where: { id: data.id! as string },
        data,
      })
    );
    return Promise.all(updatePromises);
  },

  async deleteMany({ ids }: { ids: string[] }) {
    return prismaClient.plan_inputs_resources_flight_scale_data.deleteMany({
      where: { id: { in: ids } },
    });
  },
};

export default planInputsResourcesFlightScaleDataRepo;
