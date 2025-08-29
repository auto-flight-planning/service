import { plan_notification } from "@/server/db/prisma/index.d";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler, checkRequestBody } from "@/server/utils";
import { getNotificationReqSchema } from "./schema";
import { prismaClient } from "@/server/db/prismaClient";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const parsed = await checkRequestBody(req, getNotificationReqSchema);
  if (!parsed.success) return parsed.response;

  const { userId } = parsed.data;

  const planIds = await prismaClient.plan_list
    .findMany({
      where: {
        OR: [
          {
            participant_ids: {
              has: userId,
            },
          },
          {
            creator_id: userId,
          },
        ],
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
