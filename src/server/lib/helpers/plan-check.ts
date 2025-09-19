import { User } from "@supabase/supabase-js";
import { plansRepo } from "@/server/repos/plans";
import planParticipantsService from "@/features/plan/participant/servers/service";
import { ForbiddenError, NotFoundError } from "../errors";
import { checkPlanParticipantsPermission } from "@/lib/utils";
import { type plans } from "../../db/prisma";
import { type ParticipantPermission } from "@/features/plan/participant/type";
import { PlanParticipantsDto } from "@/features/plan/participant/servers/schemas/res.schema";

type PlanCheckType = "exists" | "permission";

export default async function doPlanCheck({
  checkList,
  data,
}: {
  checkList: PlanCheckType[];
  data: {
    planId: string;
    user?: User;
    permissionCheckOptions?: { type: "CREATOR" | ParticipantPermission };
  };
}) {
  const { planId, user, permissionCheckOptions } = data;
  let plan: plans | null = null;
  let planParticipants: PlanParticipantsDto | null = null;

  for (const checkType of checkList) {
    switch (checkType) {
      case "exists":
        plan = await plansRepo.findOne({ id: planId });
        if (!plan) {
          throw new NotFoundError("企画が見つかりません");
        }
        break;
      case "permission":
        if (permissionCheckOptions!.type === "CREATOR") {
          if (plan!.creator_id !== user!.id) {
            throw new ForbiddenError("企画の生成者のみ使用権限があります");
          }
          break;
        }

        planParticipants = await planParticipantsService.getPlanParticipants({
          planId,
          creatorId: plan!.creator_id,
        });

        if (
          !checkPlanParticipantsPermission({
            planParticipants,
            userId: user!.id,
            type: permissionCheckOptions!.type,
          })
        ) {
          throw new ForbiddenError("使用権限ないユーザーです");
        }
        break;
    }
  }

  return { plan, planParticipants };
}
