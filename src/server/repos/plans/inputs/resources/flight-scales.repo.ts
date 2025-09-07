import { prismaClient } from "@/server/db/prismaClient";

const planInputsResourcesFlightScalesRepo = {
  async initOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_flight_scales.create({
      data: { plan_id: planId },
    });
  },
};

export default planInputsResourcesFlightScalesRepo;
