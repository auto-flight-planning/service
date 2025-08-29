import { z } from "zod";

export const totalPersonResourceSchema = z.object({
  pilot_cnt: z
    .number()
    .positive("0より大きい数値を入力してください")
    .nullable(),
  second_pilot_cnt: z
    .number()
    .positive("0より大きい数値を入力してください")
    .nullable(),
  total_person_exponent: z
    .number()
    .positive("0より大きい数値を入力してください")
    .nullable(),
});

export type TotalPersonResourceFormDataType = z.infer<
  typeof totalPersonResourceSchema
>;
