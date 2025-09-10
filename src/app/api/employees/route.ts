import { NextRequest, NextResponse } from "next/server";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { userIdReqSchema } from "@/server/schemas/req.schema";
import { getEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";
import { NotFoundError, withHandler } from "@/server/lib";

export const GET = withHandler(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const _userId = searchParams.get("userId");
    const validatedParams = userIdReqSchema("query").parse({ userId: _userId });
    const { userId } = validatedParams;

    const employee = await employeesRepo.findOneByUserId({ userId });
    if (!employee) {
      throw new NotFoundError("職員が見つかりません");
    }

    const res = getEmployeeByUserIdResSchema.parse({
      id: employee.id,
      userId: employee.user_id,
      lastName: employee.last_name,
      firstName: employee.first_name,
      email: employee.email,
    });
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
