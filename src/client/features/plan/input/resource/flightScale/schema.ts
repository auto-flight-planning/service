import { z } from "zod";

export const flightScaleResourceSchema = z.object({
  flight_scale_types: z.array(
    z.object({
      value: z
        .string()
        .optional()
        .refine(
          (val) => val !== undefined && val.trim() !== "",
          "運航規模の種類に空の値は入力できません"
        ),
    })
  ),
});

export type FlightScaleResourceFormDataType = z.infer<
  typeof flightScaleResourceSchema
>;
