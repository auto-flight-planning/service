import { type plans } from "@/server/db/prisma";
import { prismaClient } from "@/server/db/prismaClient";
import { getRedisClient } from "@/server/redis/client";

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
    const redisClient = await getRedisClient();

    let plan: plans | null = null;
    const cachedPlan = await redisClient.get(`plans:${id}`);

    if (cachedPlan) {
      plan = JSON.parse(cachedPlan) as plans;
      plan.target_date = new Date(plan.target_date);
      plan.created_at = new Date(plan.created_at);
    } else {
      plan = await prismaClient.plans.findUnique({
        where: { id },
      });
      await redisClient.set(`plans:${id}`, JSON.stringify(plan), {
        EX: 60 * 30,
      });
    }

    return plan;
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
    const updatedPlan = await prismaClient.plans.update({
      where: { id },
      data: { title },
    });

    const redisClient = await getRedisClient();
    await redisClient.del(`plans:${id}`);

    return updatedPlan;
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
