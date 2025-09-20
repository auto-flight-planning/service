import { NextRequest, NextResponse } from "next/server";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { userIdReqSchema } from "@/server/schemas/req.schema";
import { getEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";
import { APIWrapper, findOrThrow } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const _userId = searchParams.get("userId");
    const validatedParams = userIdReqSchema("query").parse({ userId: _userId });
    const { userId } = validatedParams;

    const employee = await findOrThrow(
      () => employeesRepo.findOneByUserId({ userId }),
      "職員が見つかりません"
    );

    const { created_at, ...rest } = employee;
    const res = getEmployeeByUserIdResSchema.parse(rest);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
