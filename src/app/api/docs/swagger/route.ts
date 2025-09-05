import { NextResponse } from "next/server";
import { openApiDocument } from "../_config/document";

export async function GET() {
  return new NextResponse(JSON.stringify(openApiDocument), {
    headers: { "Content-Type": "application/json" },
  });
}
