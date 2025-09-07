import { prismaClient } from "@/server/db/prismaClient";
import { type employees as Employees } from "@/server/db/prisma";

const employeesRepo = {
  async findOneById(id: string) {
    return prismaClient.employees.findUnique({
      where: { id },
    });
  },

  async findOneByUserId(userId: string) {
    return prismaClient.employees.findUnique({
      where: { user_id: userId },
    });
  },

  async searchManyByNames(searchName: string) {
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
