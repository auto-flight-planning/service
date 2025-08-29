import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const registerGetResultSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/api/plan/result",
    tags: ["Plan/Result"],
    summary: "運航割り当て結果を取得",
    description: "往路・復路を含む運航割り当て結果を取得",
    responses: {
      200: {
        description: "運航割り当て結果の取得に成功",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Flight assignment result retrieved successfully",
                },
                timestamp: {
                  type: "string",
                  format: "date-time",
                  example: "2025-01-01T00:00:00.000Z",
                },
                assignedFlightsCount: {
                  type: "number",
                  example: 25,
                  description: "割り当て済み運航の総数",
                },
                assignedFlights: {
                  type: "array",
                  description: "往路・復路情報を含む割り当て済み運航の配列",
                  items: {
                    type: "object",
                    properties: {
                      outbound: {
                        type: "object",
                        description: "往路運航データ",
                        properties: {
                          日付: { type: "string", example: "1日" },
                          出発国家: { type: "string", example: "日本" },
                          出発空港: { type: "string", example: "福岡" },
                          到着国家: { type: "string", example: "韓国" },
                          到着空港: { type: "string", example: "仁川" },
                          出発時刻: { type: "string", example: "07:00" },
                          飛行時間: { type: "number", example: 120 },
                          推奨最大運航数: { type: "number", example: 8 },
                          "収益(円)": { type: "number", example: 1500000 },
                          "価格(円)": { type: "number", example: 50000 },
                          "需要(名)": { type: "number", example: 180 },
                          運航規模: { type: "string", example: "中規模運航" },
                          座席数: { type: "number", example: 180 },
                          "運航可能な最小収益(円)": {
                            type: "number",
                            example: 1200000,
                          },
                          必要機長数: { type: "number", example: 1 },
                          必要副操縦士数: { type: "number", example: 1 },
                          その他必要人員指数: { type: "number", example: 12 },
                          飛行前必要時間: { type: "number", example: 45 },
                          飛行後必要時間: { type: "number", example: 45 },
                          優先順位指数: { type: "number", example: 85 },
                        },
                      },
                      inbound: {
                        type: "object",
                        description: "復路運航データ（null可能）",
                        nullable: true,
                        properties: {
                          日付: { type: "string", example: "2日" },
                          出発国家: { type: "string", example: "韓国" },
                          出発空港: { type: "string", example: "仁川" },
                          到着国家: { type: "string", example: "日本" },
                          到着空港: { type: "string", example: "福岡" },
                          出発時刻: { type: "string", example: "18:00" },
                          飛行時間: { type: "number", example: 120 },
                          推奨最大運航数: { type: "number", example: 8 },
                          "収益(円)": { type: "number", example: 1400000 },
                          "価格(円)": { type: "number", example: 48000 },
                          "需要(名)": { type: "number", example: 165 },
                          運航規模: { type: "string", example: "中規模運航" },
                          座席数: { type: "number", example: 180 },
                          "運航可能な最小収益(円)": {
                            type: "number",
                            example: 1100000,
                          },
                          必要機長数: { type: "number", example: 1 },
                          必要副操縦士数: { type: "number", example: 1 },
                          その他必要人員指数: { type: "number", example: 11 },
                          飛行前必要時間: { type: "number", example: 45 },
                          飛行後必要時間: { type: "number", example: 45 },
                          優先順位指数: { type: "number", example: 82 },
                        },
                      },
                      assignmentTime: {
                        type: "string",
                        format: "date-time",
                        example: "2025-01-01T10:30:00.000Z",
                        description: "When the flight was assigned",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Failed to retrieve flight assignment result",
                },
                message: {
                  type: "string",
                  example: "An error occurred while processing the request",
                },
              },
            },
          },
        },
      },
    },
  });
};
