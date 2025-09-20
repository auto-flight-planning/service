import { NextRequest, NextResponse } from "next/server";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { getEmployeeByIdReqSchema } from "@/features/employee/server/schemas/req.schema";
import { getEmployeeByIdResSchema } from "@/features/employee/server/schemas/res.schema";
import { APIWrapper, findOrThrow } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ employeeId: string }> }
  ) => {
    const validatedParams = getEmployeeByIdReqSchema.parse(await params);
    const { employeeId } = validatedParams;

    const employee = await findOrThrow(
      () => employeesRepo.findOneById({ id: employeeId }),
      "職員が見つかりません"
    );

    const { created_at, user_id, ...rest } = employee;
    const res = getEmployeeByIdResSchema.parse(rest);
    return NextResponse.json(res);
  }
);
