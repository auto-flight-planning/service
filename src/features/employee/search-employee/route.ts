import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { withErrorHandler } from "@/server/lib";
import { searchEmployeeResSchema } from "./schema";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const searchName = req.nextUrl.searchParams.get("searchName");
  if (!searchName) {
    return NextResponse.json(
      { error: "検索する氏名を入力してください" },
      { status: 400 }
    );
  }

  // 검색어에서 모든 공백 제거
  const trimmedSearchName = searchName.replace(/\s+/g, "");

  const employees = await prismaClient.$queryRaw<
    Array<{
      id: string;
      user_id: string;
      last_name: string;
      first_name: string;
    }>
  >`
    SELECT id, user_id, last_name, first_name 
    FROM employees 
    WHERE CONCAT(last_name, first_name) LIKE ${`%${trimmedSearchName}%`}
        OR last_name LIKE ${`%${trimmedSearchName}%`}
       OR first_name LIKE ${`%${trimmedSearchName}%`}
  `;

  const res = searchEmployeeResSchema.parse({
    employees: employees.map((employee) => ({
      employeeId: employee.id,
      userId: employee.user_id,
      lastName: employee.last_name,
      firstName: employee.first_name,
    })),
  });

  return NextResponse.json(res, { status: 200 });
});
