import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { FLIGHT_ID_EXAMPLE } from "@/constants/openapi.example";

extendZodWithOpenApi(z);

export const daySchema = z.number().int().min(1).max(31).openapi({
  description: "日付",
  example: 1,
});

export const totalFlightCntSchema = z.number().int().min(0).openapi({
  description: "総運航数",
  example: 5,
});

export const totalRevenueSchema = z.number().int().min(0).openapi({
  description: "総収益 (円)",
  example: 340_000_000,
});

export const revenueSchema = z.number().int().min(0).openapi({
  description: "収益 (円)",
  example: 850_000,
});

export const flightIdSchema = z.uuid().openapi({
  description: "運航ID",
  example: FLIGHT_ID_EXAMPLE,
});

export const departureTimeSchema = z
  .string()
  .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
  .openapi({
    description: "出発時刻 (HH:MM形式)",
    example: "09:30",
  });
