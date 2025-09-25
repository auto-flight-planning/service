import {
  planInputsResourcesFlightScalesRepo,
  planInputsResourcesFlightScaleDataRepo,
  planInputsResourcesWorkforceRepo,
  planInputsStatusRepo,
} from "@/server/repos/plans";
import { type UpdateFlightScales, type WorkforceData } from "../types";
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

  async updateFlightScales({
    planId,
    flightScales,
  }: {
    planId: string;
    flightScales: UpdateFlightScales;
  }) {
    const { addFlightScaleNames, flightScalesToUpdate, removeFlightScaleIds } =
      flightScales;

    // 1. add new scales
    await planInputsResourcesFlightScalesRepo.insertManyByPlanId({
      planId,
      scaleNames: addFlightScaleNames,
    });
    const insertedFlightScales =
      await planInputsResourcesFlightScalesRepo.findManyByPlanIdAndFlightScales(
        {
          planId,
          scaleNames: addFlightScaleNames,
        }
      );
    await planInputsResourcesFlightScaleDataRepo.initMany({
      planId,
      flightScales: insertedFlightScales.map(({ plan_id, ...rest }) => rest),
    });

    // 2. update existing scales
    const snakeCaseScalesToUpdate = snakeCaseKeys(flightScalesToUpdate, {
      deep: true,
    });
    await Promise.all([
      planInputsResourcesFlightScalesRepo.updateMany({
        planId,
        flightScales: snakeCaseScalesToUpdate,
      }),
      planInputsResourcesFlightScaleDataRepo.updateManyByFlightScales({
        planId,
        flightScales: snakeCaseScalesToUpdate,
      }),
    ]);

    // 3. remove scales
    await planInputsResourcesFlightScalesRepo.deleteMany({
      planId,
      ids: removeFlightScaleIds,
    });

    // 4. update status
    const updatedFlightScales =
      await planInputsResourcesFlightScalesRepo.findAllByPlanId({
        planId,
      });
    if (updatedFlightScales.length === 0) {
      await planInputsStatusRepo.updateOne({
        planId,
        data: {
          resources_flight_scales_status: false,
          resources_flight_scale_data_status: "NOT_STARTED",
        },
      });
    } else {
      const updatedFlightScaleData =
        await planInputsResourcesFlightScaleDataRepo.findManyByPlanId({
          planId,
        });

      let restLength = 0;
      const filteredFlightScaleData = updatedFlightScaleData.map(
        ({ plan_id, flight_scale_name, flight_scale_id, ...rest }) => {
          if (!restLength) restLength = Object.keys(rest).length;
          return rest;
        }
      );

      const nullCntArr = filteredFlightScaleData.map((data) => {
        const dataValues = Object.values(data);
        return dataValues.filter((value) => value === null).length;
      });

      const newStatus = nullCntArr.every((cnt) => cnt === 0)
        ? "COMPLETED"
        : nullCntArr.every((cnt) => cnt === restLength)
        ? "NOT_STARTED"
        : "IN_PROGRESS";
      await planInputsStatusRepo.updateOne({
        planId,
        data: {
          resources_flight_scales_status: true,
          resources_flight_scale_data_status: newStatus,
        },
      });
    }

    return updatedFlightScales;
  },
};

export default planInputService;
