import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/server/lib";
import { getEmployeeByIdReqSchema } from "@/features/employee/server/schemas/req.schema";
import { getEmployeeResSchema } from "@/features/employee/server/schemas/res.schema";
import employeeRepo from "@/server/repos/employee/employee.repo";

export const GET = withErrorHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
  ) => {
    const validatedParams = getEmployeeByIdReqSchema.parse(await params);
    const { employeeId } = validatedParams;

    const employee = await employeeRepo.findOneById(employeeId);

    if (!employee) {
      return NextResponse.json(
        { error: "職員が見つかりません" },
        { status: 404 }
      );
    }

    const res = getEmployeeResSchema.parse({
      id: employee.id,
      userId: employee.user_id,
      lastName: employee.last_name,
      firstName: employee.first_name,
      email: employee.email,
    });
    return NextResponse.json(res);
  }
);
