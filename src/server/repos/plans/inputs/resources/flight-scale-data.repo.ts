import { prismaClient } from "@/server/db/prismaClient";
import { type FlightScaleSchema } from "@/features/plan/input/servers/schemas/common.schema";

const planInputsResourcesFlightScaleDataRepo = {
  async initMany({
    planId,
    flightScales,
  }: {
    planId: string;
    flightScales: FlightScaleSchema;
  }) {
    return prismaClient.plan_inputs_resources_flight_scale_data.createMany({
      data: flightScales.map(({ id, flight_scale_name }) => ({
        plan_id: planId,
        flight_scale_id: id,
        flight_scale_name,
      })),
    });
  },

  async findManyByPlanId({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_flight_scale_data.findMany({
      where: { plan_id: planId },
    });
  },

  async updateManyByFlightScales({
    planId,
    flightScales,
  }: {
    planId: string;
    flightScales: FlightScaleSchema;
  }) {
    const updatePromises = flightScales.map(({ id, flight_scale_name }) =>
      prismaClient.plan_inputs_resources_flight_scale_data.update({
        where: { plan_id: planId, flight_scale_id: id },
        data: { flight_scale_name },
      })
    );
    return Promise.all(updatePromises);
  },
};

export default planInputsResourcesFlightScaleDataRepo;
