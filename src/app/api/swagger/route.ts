import { NextResponse } from "next/server";

export async function GET() {
  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Auto Flight Planning API",
      version: "1.0.0",
      description: "자동 비행 계획 수립을 위한 API",
    },
    paths: {
      "/api/temp": {
        get: {
          summary: "임시 엔드포인트",
          description: "테스트용 임시 엔드포인트입니다.",
          responses: {
            "200": {
              description: "성공",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Hello from API!",
                      },
                      timestamp: {
                        type: "string",
                        format: "date-time",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "개발 서버",
      },
    ],
  };

  return NextResponse.json(swaggerSpec);
}
