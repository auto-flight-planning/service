import { User } from "@supabase/supabase-js";
import { plansRepo } from "@/server/repos/plans";
import { ForbiddenError, NotFoundError } from "./errors";

type PlanCheckType = "exists" | "creator";

export default async function doPlanCheck(
  checkList: PlanCheckType[],
  data: { planId: string; user?: User }
) {
  const { planId, user } = data;
  const plan = await plansRepo.findOne({ id: planId });

  for (const checkType of checkList) {
    switch (checkType) {
      case "exists":
        if (!plan) {
          throw new NotFoundError("企画が見つかりません");
        }
        break;
      case "creator":
        if (plan!.creator_id !== user!.id) {
          throw new ForbiddenError("権限がありません");
        }
        break;
    }
  }

  return { plan: plan! };
}
