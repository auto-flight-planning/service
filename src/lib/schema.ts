import { z } from "zod";

export const numberAndBigintSchema = z
  .union([z.bigint(), z.number()])
  .transform((val) => (typeof val === "number" ? BigInt(val) : Number(val)));

export const positiveNumberSchema = z
  .number()
  .positive("0より大きい数値を入力してください")
  .nullable()
  .optional();

export const timeSchema = z.object({
  hours: z
    .number()
    .int()
    .min(0, "0以上の数値を入力してください")
    .nullable()
    .optional(),
  minutes: z
    .number()
    .int()
    .refine((val) => val >= 0 && val <= 59, {
      message: "0以上59以下の整数を入力してください",
    })
    .nullable()
    .optional(),
});
