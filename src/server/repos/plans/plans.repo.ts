import { prismaClient } from "@/server/db/prismaClient";

const plansRepo = {
  async insertOne({
    title,
    targetDate,
    creatorId,
  }: {
    title: string;
    targetDate: Date;
    creatorId: string;
  }) {
    return prismaClient.plans.create({
      data: {
        title,
        target_date: targetDate,
        creator_id: creatorId,
      },
    });
  },

  async findOne({ id }: { id: string }) {
    return prismaClient.plans.findUnique({
      where: { id },
    });
  },

  async findManyByIds({ idList }: { idList: string[] }) {
    return prismaClient.plans.findMany({
      where: { id: { in: idList } },
    });
  },

  async findManyByCreatorId({ creatorId }: { creatorId: string }) {
    return prismaClient.plans.findMany({
      where: { creator_id: creatorId },
    });
  },

  async searchManyByTitle({ title }: { title: string }) {
    return prismaClient.plans.findMany({
      where: { title: { contains: title } },
    });
  },

  async searchManyByStatus({ statusList }: { statusList: string[] }) {
    return prismaClient.plans.findMany({
      where: { status: { in: statusList } },
    });
  },

  async updateOneTitle({ id, title }: { id: string; title: string }) {
    return prismaClient.plans.update({
      where: { id },
      data: { title },
    });
  },

  async updateOneStatus({ id, status }: { id: string; status: string }) {
    return prismaClient.plans.update({
      where: { id },
      data: { status },
    });
  },

  async deleteOne({ id }: { id: string }) {
    return prismaClient.plans.delete({
      where: { id },
    });
  },
};

export default plansRepo;
