import { prismaClient } from "@/server/db/prismaClient";

const planInputsAirportsRepo = {
  async initAll({ planId }: { planId: string }) {
    const airports = await prismaClient.airports.findMany();
    const airportCodeList = airports.map((airport) => airport.airport_code);

    return prismaClient.plan_inputs_airports.createMany({
      data: airportCodeList.map((airportCode) => ({
        plan_id: planId,
        airport_code: airportCode,
      })),
    });
  },
};

export default planInputsAirportsRepo;
