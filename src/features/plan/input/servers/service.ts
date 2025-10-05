import {
  planInputsResourcesWorkforceRepo,
  planInputsResourcesFlightScaleDataRepo,
  planInputsStatusRepo,
} from "@/server/repos/plans";
import { type WorkforceData, type UpdateFlightScaleDatas } from "../types";
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

  async updateFlightScaleDatas({
    planId,
    flightScaleDatas,
  }: {
    planId: string;
    flightScaleDatas: UpdateFlightScaleDatas;
  }) {
    const {
      addFlightScaleDatas,
      updateFlightScaleDatas,
      removeFlightScaleDataIds,
    } = flightScaleDatas;

    const promises = [];

    // 1. add
    if (addFlightScaleDatas.length > 0) {
      promises.push(
        planInputsResourcesFlightScaleDataRepo.insertMany({
          flightScaleDatas: addFlightScaleDatas.map(
            ({ name, index, ...rest }) => ({
              plan_id: planId,
              name: name!,
              index: index!,
              ...snakeCaseKeys(rest, { deep: true }),
            })
          ),
        })
      );
    }

    // 2. update
    if (updateFlightScaleDatas.length > 0) {
      promises.push(
        planInputsResourcesFlightScaleDataRepo.updateMany({
          flightScaleDatas: snakeCaseKeys(updateFlightScaleDatas, {
            deep: true,
          }),
        })
      );
    }

    // 3. remove
    if (removeFlightScaleDataIds.length > 0) {
      promises.push(
        planInputsResourcesFlightScaleDataRepo.deleteMany({
          ids: removeFlightScaleDataIds,
        })
      );
    }

    if (promises.length > 0) await Promise.all(promises);

    // 4. update status
    const updatedFlightScaleData =
      await planInputsResourcesFlightScaleDataRepo.findAllByPlanId({
        planId,
      });

    if (updatedFlightScaleData.length === 0) {
      await planInputsStatusRepo.updateOne({
        planId,
        data: {
          resources_flight_scale_data_status: "NOT_STARTED",
        },
      });
    } else {
      const inputStatuses = updatedFlightScaleData.map(
        ({ plan_id, id, name, index, ...rest }) => {
          const dataValues = Object.values(rest);
          return dataValues.every((value) => value !== null);
        }
      );
      await planInputsStatusRepo.updateOne({
        planId,
        data: {
          resources_flight_scale_data_status: inputStatuses.every(
            (value) => value
          )
            ? "COMPLETED"
            : "IN_PROGRESS",
        },
      });
    }

    return updatedFlightScaleData;
  },
};

export default planInputService;
