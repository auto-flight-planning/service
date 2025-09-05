import { FieldErrors, useForm } from "react-hook-form";
import {
  FlightScaleResourceFormDataType,
  flightScaleResourceSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/(web)/_providers/reactQueryProvider";
import { useToastStore } from "@/features/toast";
import { useEffect } from "react";

export default function useFlightScaleResource(planId: string) {
  const { data: flightScaleResource, isPending: isPendingToGet } = useQuery({
    queryKey: ["planInput", "flightScaleResource", planId],
    queryFn: () => getFlightScaleResourceAPI(planId),
  });

  const formMethods = useForm<FlightScaleResourceFormDataType>({
    mode: "onChange",
    resolver: zodResolver(flightScaleResourceSchema),
    defaultValues: {
      flight_scale_types: [{ value: "" }],
    },
  });

  useEffect(() => {
    if (flightScaleResource && !isPendingToGet) {
      const defaultValues =
        !flightScaleResource.flight_scale_types ||
        flightScaleResource.flight_scale_types.length === 0
          ? [{ value: "" }]
          : flightScaleResource.flight_scale_types.map((type: string) => ({
              value: type,
            }));

      formMethods.reset({
        flight_scale_types: defaultValues,
      });
    }
  }, [flightScaleResource, isPendingToGet, formMethods]);

  const { addToast } = useToastStore();

  const { mutate: updateFlightScaleResource, isPending: isPendingToUpdate } =
    useMutation({
      mutationFn: (data: FlightScaleResourceFormDataType) =>
        updateFlightScaleResourceAPI(data, planId),
      onSuccess: () => {
        addToast({
          type: "success",
          message: "運航規模データの入力に成功しました。",
          title: "運航規模データ入力成功",
        });
        queryClient.invalidateQueries({ queryKey: ["planInfo", planId] });
        queryClient.invalidateQueries({
          queryKey: ["planInput", "flightScaleResource", planId],
        });
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error.message || "運航規模データの入力に失敗しました。",
          title: "運航規模データ入力失敗",
        });
      },
    });

  const onValidSubmit = (data: FlightScaleResourceFormDataType) => {
    console.log("=== VALID SUBMIT ===");
    console.log("submitted data:", data);
    console.log("flight_scale_types:", data.flight_scale_types);
    console.log("stringified:", JSON.stringify(data, null, 2));
  };

  const onInvalidSubmit = (
    errors: FieldErrors<FlightScaleResourceFormDataType>
  ) => {
    console.log("=== INVALID SUBMIT ===");
    console.log("validation errors:", errors);
    console.log("stringified errors:", JSON.stringify(errors, null, 2));
  };

  return {
    formMethods,
    onValidSubmit,
    onInvalidSubmit,
    isPendingToGet,
    isPendingToUpdate,
  };
}

export const getFlightScaleResourceAPI = async (planId: string) => {
  const res = await fetch(
    `/api/plan/input/resource/get/flight-scale?planId=${planId}`
  );
  if (!res.ok) {
    throw new Error("運航規模データの取得に失敗しました。");
  }
  return res.json();
};

export const updateFlightScaleResourceAPI = async (
  data: FlightScaleResourceFormDataType,
  planId: string
) => {
  const res = await fetch("/api/plan/input/resource/update/flight-scale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId,
      flight_scale_types: data.flight_scale_types
        .map((type) => type.value)
        .filter((value) => value !== undefined),
    }),
  });
  if (!res.ok) {
    throw new Error("運航規模データの入力に失敗しました。");
  }
  return res.json();
};
