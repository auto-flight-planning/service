import { WorkforceData } from "../types";
import {
  planInputsResourcesWorkforceRepo,
  planInputsStatusRepo,
} from "@/server/repos/plans";
import snakeCaseKeys from "snakecase-keys";

const planInputService = {
  async updateWorkforce({
    planId,
    workforceData,
  }: {
    planId: string;
    workforceData: WorkforceData;
  }) {
    const { plan_id, ...updatedWorkforceData } =
      await planInputsResourcesWorkforceRepo.updateOne({
        planId,
        data: snakeCaseKeys(workforceData),
      });

    const updatedWorkforcaDataValues = Object.values(updatedWorkforceData);
    const nullCnt = updatedWorkforcaDataValues.filter(
      (value) => value === null
    ).length;

    await planInputsStatusRepo.updateOne({
      planId,
      data: {
        resources_workforce_status:
          nullCnt === 0
            ? "COMPLETED"
            : nullCnt === updatedWorkforcaDataValues.length
            ? "NOT_STARTED"
            : "IN_PROGRESS",
      },
    });

    return updatedWorkforceData;
  },
};

export default planInputService;
