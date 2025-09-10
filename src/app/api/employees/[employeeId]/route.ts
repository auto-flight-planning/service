import { NextRequest, NextResponse } from "next/server";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { getEmployeeByIdReqSchema } from "@/features/employee/server/schemas/req.schema";
import { getEmployeeByIdResSchema } from "@/features/employee/server/schemas/res.schema";
import { NotFoundError, withHandler } from "@/server/lib";

export const GET = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
  ) => {
    const validatedParams = getEmployeeByIdReqSchema.parse(await params);
    const { employeeId } = validatedParams;
    const employee = await employeesRepo.findOneById({ id: employeeId });

    if (!employee) {
      throw new NotFoundError("職員が見つかりません");
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
