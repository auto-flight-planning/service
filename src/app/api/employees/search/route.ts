import { NextRequest, NextResponse } from "next/server";
import { type User } from "@supabase/supabase-js";
import employeesRepo from "@/server/repos/employees/employees.repo";
import { searchEmployeesByNameReqSchema } from "@/features/employee/server/schemas/req.schema";
import { searchEmployeesByNameResSchema } from "@/features/employee/server/schemas/res.schema";
import { APIWrapper } from "@/server/lib/helpers";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<any> },
    user: User
  ) => {
    const searchParams = request.nextUrl.searchParams;
    const _searchName = searchParams.get("searchName");
    const validatedParams = searchEmployeesByNameReqSchema.parse({
      searchName: _searchName,
    });
    const { searchName } = validatedParams;

    const employees = await employeesRepo.searchManyByNames({ searchName });
    const filteredEmployees = employees.filter(
      (employee) => employee.user_id !== user.id
    );

    const res = searchEmployeesByNameResSchema.parse({
      employees: filteredEmployees.map((employee) => ({
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
    onAuth: true,
  }
);
