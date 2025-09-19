import { NextRequest, NextResponse } from "next/server";
import planParticipantsService from "@/features/plan/participant/servers/service";
import { type User } from "@supabase/supabase-js";
import { planIdReqSchema } from "@/server/schemas/req.schema";
import {
  getPlanParticipantsResSchema,
  updatePlanParticipantsResSchema,
} from "@/features/plan/participant/servers/schemas/res.schema";
import { updateParticipantsReqSchema } from "@/features/plan/participant/servers/schemas/req.schema";
import { APIWrapper, doPlanCheck } from "@/server/lib";

export const GET = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> }
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    const { plan } = await doPlanCheck(["exists"], { planId });

    const planParticipants = await planParticipantsService.getPlanParticipants({
      planId,
      creatorId: plan.creator_id,
    });

    const res = getPlanParticipantsResSchema.parse(planParticipants);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);

export const PUT = APIWrapper(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ planId: string }> },
    user: User
  ) => {
    const validatedParams = planIdReqSchema("path").parse(await params);
    const { planId } = validatedParams;

    await doPlanCheck(["exists", "creator"], { planId, user });

    const requestBody = await request.json();
    const validatedRequestBody = updateParticipantsReqSchema.parse(requestBody);
    const updateParticipantData = validatedRequestBody;

    const updatedParticipants =
      await planParticipantsService.updatePlanParticipants({
        planId,
        updateParticipantData,
      });

    const res = updatePlanParticipantsResSchema.parse(updatedParticipants);
    return NextResponse.json(res);
  },
  {
    onAuth: true,
  }
);
