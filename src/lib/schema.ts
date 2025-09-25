import { z } from "zod";

export const numberAndBigintSchema = z
  .union([z.bigint(), z.number()])
  .transform((val) => (typeof val === "number" ? BigInt(val) : Number(val)));

export const positiveNumberSchema = z
  .number()
  .positive("0より大きい数値を入力してください")
  .nullable();
