import { NextRequest, NextResponse } from "next/server";
import { withHandler } from "@/server/lib";
import { userIdReqSchema } from "@/server/schemas/req.schema";
import { getEmployeeByUserIdResSchema } from "@/features/employee/server/schemas/res.schema";
import employeeRepo from "@/server/repos/employee/employee.repo";

export const GET = withHandler(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const _userId = searchParams.get("userId");

    const validatedParams = userIdReqSchema("query").parse({ userId: _userId });
    const { userId } = validatedParams;

    const employee = await employeeRepo.findOneByUserId(userId);

    if (!employee) {
      return NextResponse.json(
        { error: "職員が見つかりません" },
        { status: 404 }
      );
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
    onError: true,
    onAuth: true,
  }
);
