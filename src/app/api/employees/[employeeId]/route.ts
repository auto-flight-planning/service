import { NextRequest, NextResponse } from "next/server";
import { withHandler } from "@/server/lib";
import { getEmployeeByIdReqSchema } from "@/features/employee/server/schemas/req.schema";
import { getEmployeeByIdResSchema } from "@/features/employee/server/schemas/res.schema";
import employeesRepo from "@/server/repos/employees/employees.repo";

export const GET = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
  ) => {
    const validatedParams = getEmployeeByIdReqSchema.parse(await params);
    const { employeeId } = validatedParams;

    const employee = await employeesRepo.findOneById({ id: employeeId });

    if (!employee) {
      return NextResponse.json(
        { error: "職員が見つかりません" },
        { status: 404 }
      );
    }

    const res = getEmployeeByIdResSchema.parse({
      id: employee.id,
      lastName: employee.last_name,
      firstName: employee.first_name,
      email: employee.email,
    });
    return NextResponse.json(res);
  }
);
