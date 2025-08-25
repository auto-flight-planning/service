import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { withErrorHandler, checkRequestBody } from "@/server/utils";
import { getEmployeeReqSchema, getEmployeeResSchema } from "./schema";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, getEmployeeReqSchema);
  if (!parsed.success) return parsed.response;

  const { userId } = parsed.data;
  const employee = await prismaClient.employees.findUnique({
    where: { user_id: userId },
  });

  if (!employee) {
    return NextResponse.json(
      { error: "存在しないユーザーIDです" },
      { status: 404 }
    );
  }

  const res = getEmployeeResSchema.parse({
    employeeId: employee.id,
    lastName: employee.last_name,
    firstName: employee.first_name,
  });
  return NextResponse.json(res, { status: 200 });
});
