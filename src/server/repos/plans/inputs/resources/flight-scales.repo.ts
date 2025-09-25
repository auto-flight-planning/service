import { prismaClient } from "@/server/db/prismaClient";
import { type FlightScaleSchema } from "@/features/plan/input/servers/schemas/common.schema";

const planInputsResourcesFlightScalesRepo = {
  async insertManyByPlanId({
    planId,
    scaleNames,
  }: {
    planId: string;
    scaleNames: string[];
  }) {
    return prismaClient.plan_inputs_resources_flight_scales.createMany({
      data: scaleNames.map((scaleName) => ({
        plan_id: planId,
        flight_scale_name: scaleName,
      })),
    });
  },

  async findAllByPlanId({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_flight_scales.findMany({
      where: { plan_id: planId },
    });
  },

  async findManyByPlanIdAndFlightScales({
    planId,
    scaleNames,
  }: {
    planId: string;
    scaleNames: string[];
  }) {
    return prismaClient.plan_inputs_resources_flight_scales.findMany({
      where: { plan_id: planId, flight_scale_name: { in: scaleNames } },
    });
  },

  async updateMany({
    planId,
    flightScales,
  }: {
    planId: string;
    flightScales: FlightScaleSchema;
  }) {
    const updatePromises = flightScales.map(({ id, flight_scale_name }) =>
      prismaClient.plan_inputs_resources_flight_scales.update({
        where: { plan_id: planId, id },
        data: { flight_scale_name },
      })
    );
    return Promise.all(updatePromises);
  },

  async deleteMany({ planId, ids }: { planId: string; ids: string[] }) {
    return prismaClient.plan_inputs_resources_flight_scales.deleteMany({
      where: { plan_id: planId, id: { in: ids } },
    });
  },
};

export default planInputsResourcesFlightScalesRepo;
