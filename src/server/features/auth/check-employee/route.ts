import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { withErrorHandler, checkRequestBody } from "@/server/utils";
import { checkEmployeeReqSchema, checkEmployeeResSchema } from "./schema";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, checkEmployeeReqSchema);
  if (!parsed.success) return parsed.response;

  const { employeeId } = parsed.data;
  const employee = await prismaClient.employees.findUnique({
    where: { id: employeeId },
    include: { users: true }, // ユーザー情報も取得
  });

  if (!employee) {
    return NextResponse.json(
      { error: "存在しない職員IDです" },
      { status: 404 }
    );
  }

  const res = checkEmployeeResSchema.parse({
    employeeId: employee.id,
    email: employee.users.email,
    lastName: employee.last_name,
    firstName: employee.first_name,
  });
  return NextResponse.json(res, { status: 200 });
});
