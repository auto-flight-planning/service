import { plan_notification } from "./../../../../db/prisma/index.d";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler, checkRequestBody } from "@/server/utils";
import { getNotificationReqSchema, getNotificationResSchema } from "./schema";
import { prismaClient } from "@/server/db/prismaClient";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, getNotificationReqSchema);
  if (!parsed.success) return parsed.response;

  const { userId } = parsed.data;

  const planIds = await prismaClient.plan_list
    .findMany({
      where: {
        participant_ids: {
          has: userId,
        },
      },
    })
    .then((res) => res.map((item) => item.id));

  const notifications: plan_notification[] =
    await prismaClient.plan_notification.findMany({
      where: {
        plan_id: {
          in: planIds,
        },
      },
    });

  return NextResponse.json(notifications, { status: 200 });
});
