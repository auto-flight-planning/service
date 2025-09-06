import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const airportPointSchema = z.object({
  country_code: z.string().length(2).openapi({
    description: "国コード (ISO 3166-1 alpha-2)",
    example: "jp",
  }),
  country_name: z.string().openapi({
    description: "国名",
    example: "日本",
  }),
  airport_code: z.string().length(3).openapi({
    description: "空港コード (IATA)",
    example: "NRT",
  }),
  airport_name: z.string().openapi({
    description: "空港名",
    example: "成田",
  }),
});

export type AirportPointDto = z.infer<typeof airportPointSchema>;
