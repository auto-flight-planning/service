import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/server/db/prismaClient";
import { checkRequestBody } from "@/server/utils";
import { loginReqSchema, loginResSchema } from "./schema";
import createServerClient from "@/server/supabase/serverClient";

export const POST = async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, loginReqSchema);
  if (!parsed.success) return parsed.response;

  const { employeeId, password } = parsed.data;
  const employee = await prismaClient.employees.findUnique({
    where: { id: employeeId },
  });
  if (!employee) {
    return NextResponse.json(
      { error: "存在しない職員IDです" },
      { status: 404 }
    );
  }

  const user = await prismaClient.users.findUnique({
    where: { id: employee.user_id },
  });
  if (!user) {
    return NextResponse.json(
      { error: "存在しないユーザーです" },
      { status: 404 }
    );
  }

  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password,
  });
  if (error) {
    return NextResponse.json(
      { error: "パスワードが間違っています" },
      { status: 401 } // Unauthorized
    );
  }

  const res = loginResSchema.parse({
    accessToken: data.session.access_token,
    employeeId: employee.id,
    lastName: employee.last_name,
    firstName: employee.first_name,
  });
  return NextResponse.json(res, { status: 200 });
};
