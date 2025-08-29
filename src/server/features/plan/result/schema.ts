import { z } from "zod";

// FlightDataスキーマ（既存タイプと一致）
export const flightDataSchema = z.object({
  日付: z.string(),
  出発国家: z.string(),
  出発空港: z.string(),
  到着国家: z.string(),
  到着空港: z.string(),
  出発時刻: z.string(),
  飛行時間: z.number(),
  推奨最大運航数: z.number(),
  "収益(円)": z.number(),
  "価格(円)": z.number(),
  "需要(名)": z.number(),
  運航規模: z.string(),
  座席数: z.number(),
  "運航可能な最小収益(円)": z.number(),
  必要機長数: z.number(),
  必要副操縦士数: z.number(),
  その他必要人員指数: z.number(),
  飛行前必要時間: z.number(),
  飛行後必要時間: z.number(),
  優先順位指数: z.number(),
});

// AssignedFlightスキーマ
export const assignedFlightSchema = z.object({
  outbound: flightDataSchema,
  inbound: flightDataSchema.nullable(),
  assignmentTime: z.date(),
});

// レスポンススキーマ
export const getResultResponseSchema = z.object({
  message: z.string(),
  timestamp: z.date(),
  assignedFlightsCount: z.number(),
  assignedFlights: z.array(assignedFlightSchema),
});

// タイプ定義
export type FlightData = z.infer<typeof flightDataSchema>;
export type AssignedFlight = z.infer<typeof assignedFlightSchema>;
export type GetResultResponse = z.infer<typeof getResultResponseSchema>;
