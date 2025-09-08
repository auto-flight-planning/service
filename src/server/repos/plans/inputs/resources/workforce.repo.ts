import { prismaClient } from "@/server/db/prismaClient";

const planInputsResourcesWorkforceRepo = {
  async initOne({ planId }: { planId: string }) {
    return prismaClient.plan_inputs_resources_workforce.create({
      data: { plan_id: planId },
    });
  },
};

export default planInputsResourcesWorkforceRepo;
