import { NextRequest, NextResponse } from "next/server";
import planParticipantsService from "@/features/plan/participant/servers/service";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import { withHandler } from "@/server/lib";

export const GET = withHandler(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> }
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const planParticipants = await planParticipantsService.getPlanParticipants({
      planId,
    });

    return NextResponse.json(planParticipants);
  }
);
