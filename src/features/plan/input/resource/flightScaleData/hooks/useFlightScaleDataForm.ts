import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/features/toast";
import { useModalStore } from "@/features/modal";
import { usePlanId } from "@/features/plan/stores/planStore";
import useGetFlightScaleData from "./useGetFlightScaleData";
import {
  FlightScaleDataFormData,
  flightScaleDataFormSchema,
} from "../schemas/formSchema";
import { UpdateFlightScaleDataReqSchema } from "@/features/plan/input/servers/schemas/req.schema";
import {
  GetFlightScaleDataResSchema,
  UpdateFlightScaleDataResSchema,
} from "@/features/plan/input/servers/schemas/res.schema";
import { minutesToTime, timeToMinutes } from "@/lib/utils";
import snakeCaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import { apiFetchJson } from "@/lib/api";
import { FlightScaleDataWithIdSchema } from "../../../servers/schemas/common.schema";
import { DEFAULT_FLIGHT_SCALE_DATA } from "../constant";

export default function useFlightScaleDataForm() {
  const planId = usePlanId();
  const { flightScaleData, isFetching } = useGetFlightScaleData();

  const formMethods = useForm<FlightScaleDataFormData>({
    mode: "onChange",
    resolver: zodResolver(flightScaleDataFormSchema),
    defaultValues: {
      flightScaleDataValues: [DEFAULT_FLIGHT_SCALE_DATA],
    },
  });

  // init
  useEffect(() => {
    if (flightScaleData && !isFetching && flightScaleData.length > 0) {
      formMethods.reset({
        flightScaleDataValues: flightScaleData.map((data) => {
          const camelcaseData = camelcaseKeys(data, { deep: true });
          const {
            id,
            name,
            index,
            requiredPreFlightMinutes,
            requiredPostFlightMinutes,
            ...rest
          } = camelcaseData;
          const bigIntToNumberRest = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [
              key,
              value ? Number(value) : undefined,
            ])
          );

          return {
            id,
            name,
            ...bigIntToNumberRest,
            requiredPreFlightTime: requiredPreFlightMinutes
              ? minutesToTime(requiredPreFlightMinutes)
              : {
                  hours: undefined,
                  minutes: undefined,
                },
            requiredPostFlightTime: requiredPostFlightMinutes
              ? minutesToTime(requiredPostFlightMinutes)
              : {
                  hours: undefined,
                  minutes: undefined,
                },
          };
        }),
      });
    }
  }, [isFetching]);

  const { addToast } = useToastStore();
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: updateFlightScaleData, isPending } = useMutation({
    mutationFn: (data: FlightScaleDataFormData) =>
      updateFlightScaleDataAPI(planId, flightScaleData!, data),
    onSuccess: (data) => {
      addToast({
        type: "success",
        message: "運航規模別データを更新しました。",
        title: "運航規模別データ更新成功",
      });
      queryClient.invalidateQueries({
        queryKey: ["planInput", planId, "flightScaleData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["plan", planId, "status", "input"],
      });
      openModal("flightScaleDataView");
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: "運航規模別データを更新に失敗しました。",
        title: "運航規模別データ更新失敗",
      });
    },
  });

  const onValidSubmit = (data: FlightScaleDataFormData) =>
    updateFlightScaleData(data);

  return {
    formMethods,
    onValidSubmit,
    isPending,
  };
}

export const updateFlightScaleDataAPI = async (
  planId: string,
  prevFlightScaleData: GetFlightScaleDataResSchema,
  formData: FlightScaleDataFormData
) => {
  try {
    const res = await apiFetchJson<UpdateFlightScaleDataResSchema>(
      `/api/plans/${planId}/inputs/resources/flight-scale-data`,
      {
        method: "PUT",
        body: formatFormDataToReq(prevFlightScaleData, formData),
      }
    );
    const updatedFlightScaleData = camelcaseKeys(res, { deep: true });
    return updatedFlightScaleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const formatFormDataToReq = (
  prevFlightScaleData: GetFlightScaleDataResSchema,
  formData: FlightScaleDataFormData
): UpdateFlightScaleDataReqSchema => {
  // 1. convert form data to model schema
  const formDataToModelSchema = formData.flightScaleDataValues.map(
    (
      { requiredPreFlightTime, requiredPostFlightTime, ...formDataRest },
      index
    ) => {
      return {
        index,
        required_pre_flight_minutes: timeToMinutes(requiredPreFlightTime),
        required_post_flight_minutes: timeToMinutes(requiredPostFlightTime),
        ...snakeCaseKeys(formDataRest),
      };
    }
  );

  // 2. get add flight scale data
  const addFlightScaleData = formDataToModelSchema
    .filter((data) => !prevFlightScaleData.some((d) => d.id === data.id))
    .map(({ id, index, ...rest }) => {
      const dropNullishItems = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value)
      ) as Record<string, string | number>;
      return { ...dropNullishItems, index };
    });

  // 3. get update flight scale data
  const updateFlightScaleData = formDataToModelSchema
    .filter((data) => prevFlightScaleData.some((d) => d.id === data.id))
    .map(({ id, index, ...currentData }) => {
      const prevData = prevFlightScaleData.find((d) => d.id === id) as {
        [key: string]: string | number | bigint | undefined;
      };

      // 変更されたフィールドを検出
      const changedFields = Object.entries(currentData)
        .filter(([key, value]) => {
          const prevValue = prevData[key];

          // 両方とも null または undefined の場合、変更なし
          if (!prevValue && !value) return false;

          // bigint を number に変換して比較
          const normalizedPrevValue =
            typeof prevValue === "bigint" ? Number(prevValue) : prevValue;

          return normalizedPrevValue !== value;
        })
        .map(
          ([key, value]) =>
            [key, value === undefined ? null : value] as [
              string,
              string | number | null
            ]
        );

      // 変更がある場合のみ、更新データを返す
      return changedFields.length > 0
        ? { id, index, ...Object.fromEntries(changedFields) }
        : undefined;
    })
    .filter((data) => data !== undefined) as FlightScaleDataWithIdSchema[];

  // 4. get remove flight scale data
  const removeFlightScaleData = prevFlightScaleData.filter(
    (data) => !formDataToModelSchema.some((d) => d.id === data.id)
  );

  return {
    add_flight_scale_datas: addFlightScaleData,
    update_flight_scale_datas: updateFlightScaleData,
    remove_flight_scale_data_ids: removeFlightScaleData.map((d) => d.id),
  };
};
