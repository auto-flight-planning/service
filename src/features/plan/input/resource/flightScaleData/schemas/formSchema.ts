import { z } from "zod";
import { positiveNumberSchema, timeSchema } from "@/lib/schema";

export const flightScaleDataFormSchema = z.object({
  flightScaleDataValues: z
    .array(
      z.object({
        id: z.uuid().optional(),
        name: z.string().min(1, "運航規模種類名を入力してください"),
        airplaneCnt: positiveNumberSchema,
        minStandbyAirplaneCnt: positiveNumberSchema,
        seatCnt: positiveNumberSchema,
        requiredCaptainCnt: positiveNumberSchema,
        requiredSubCaptainCnt: positiveNumberSchema,
        requiredOtherPersonnelNorm: positiveNumberSchema,
        requiredPreFlightTime: timeSchema,
        requiredPostFlightTime: timeSchema,
        minRequiredRevenue: positiveNumberSchema,
      })
    )
    .superRefine((values, ctx) => {
      const nameCounts = new Map<string, number[]>();

      // 各 name のインデックスを収集
      values.forEach((item, index) => {
        if (item.name) {
          if (!nameCounts.has(item.name)) {
            nameCounts.set(item.name, []);
          }
          nameCounts.get(item.name)!.push(index);
        }
      });

      // name が重複している場合、それぞれの項目にエラーを追加
      nameCounts.forEach((indices, name) => {
        if (indices.length > 1) {
          indices.forEach((index) => {
            ctx.addIssue({
              code: "custom",
              message: "運航規模種類名は重複できません",
              path: [index, "name"],
            });
          });
        }
      });
    }),
});
export type FlightScaleDataFormData = z.infer<typeof flightScaleDataFormSchema>;
