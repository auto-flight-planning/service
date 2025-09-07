import { prismaClient } from "@/server/db/prismaClient";

const airportsRepo = {
  async findAll() {
    return prismaClient.airports.findMany();
  },
};

export default airportsRepo;
