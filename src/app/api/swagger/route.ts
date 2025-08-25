import { NextResponse } from "next/server";
import { openApiDocument } from "@/server/openapi/document";

export async function GET() {
  return new NextResponse(JSON.stringify(openApiDocument), {
    headers: { "Content-Type": "application/json" },
  });
}
