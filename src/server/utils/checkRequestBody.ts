import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z, ZodType } from "zod";

export default async function checkRequestBody<TSchema extends ZodType>(
  req: NextRequest,
  schema: TSchema
): Promise<
  | { success: true; data: z.output<TSchema> }
  | { success: false; response: NextResponse }
> {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        success: false,
        response: NextResponse.json(
          { error: parsed.error.message },
          { status: 400 }
        ),
      };
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid JSON" }, { status: 400 }),
    };
  }
}
