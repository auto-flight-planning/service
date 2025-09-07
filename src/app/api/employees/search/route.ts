import { NextRequest, NextResponse } from "next/server";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { searchEmployeesByNameReqSchema } from "@/features/employee/server/schemas/req.schema";
import { searchEmployeesByNameResSchema } from "@/features/employee/server/schemas/res.schema";
import { withHandler } from "@/server/lib";

export const GET = withHandler(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const _searchName = searchParams.get("searchName");
    const validatedParams = searchEmployeesByNameReqSchema.parse({
      searchName: _searchName,
    });
    const { searchName } = validatedParams;

    const employees = await employeesRepo.searchManyByNames({ searchName });
    // TODO: ログインしている職員を除外

    const res = searchEmployeesByNameResSchema.parse({
      employees: employees.map((employee) => ({
        id: employee.id,
        userId: employee.user_id,
        lastName: employee.last_name,
        firstName: employee.first_name,
        email: employee.email,
      })),
    });
    return NextResponse.json(res);
  },
  {
    onError: true,
    onAuth: true,
  }
);
