import { prismaClient } from "@/server/db/prismaClient";
import { type employees as Employees } from "@/server/db/prisma";

const employeesRepo = {
  async findOneById({ id }: { id: string }) {
    return prismaClient.employees.findUnique({
      where: { id },
    });
  },

  async findOneByUserId({ userId }: { userId: string }) {
    return prismaClient.employees.findUnique({
      where: { user_id: userId },
    });
  },

  async findManyByUserIds({ userIds }: { userIds: string[] }) {
    return prismaClient.employees.findMany({
      where: { user_id: { in: userIds } },
    });
  },

  async searchManyByNames({ searchName }: { searchName: string }) {
    const trimmedSearchName = searchName.trim();

    return prismaClient.$queryRaw<Array<Employees>>`
      SELECT id, user_id, last_name, first_name, email 
      FROM employees 
      WHERE CONCAT(last_name, first_name) LIKE ${`%${trimmedSearchName}%`}
         OR last_name LIKE ${`%${trimmedSearchName}%`}
         OR first_name LIKE ${`%${trimmedSearchName}%`}
    `;
  },
};

export default employeesRepo;
