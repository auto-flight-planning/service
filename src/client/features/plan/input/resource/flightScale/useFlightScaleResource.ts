import { FieldErrors, useForm } from "react-hook-form";
import {
  FlightScaleResourceFormDataType,
  flightScaleResourceSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useFlightScaleResource(planId: string) {
  const formMethods = useForm<FlightScaleResourceFormDataType>({
    mode: "onChange",
    resolver: zodResolver(flightScaleResourceSchema),
    defaultValues: {
      flight_scale_type: [{ value: "" }],
    },
  });

  const onValidSubmit = (data: FlightScaleResourceFormDataType) => {
    console.log("=== VALID SUBMIT ===");
    console.log("submitted data:", data);
    console.log("flight_scale_type:", data.flight_scale_type);
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
  };
}
