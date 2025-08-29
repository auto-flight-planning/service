import { NextRequest, NextResponse } from "next/server";
import { FlightAssignmentEngine } from "./utils/flightAssignmentEngine";
import { DUMMY_DATA_PATHS } from "./path";
import { getResultResponseSchema } from "./schema";

/**
 * GET /api/plan/result
 * 運航割り当て結果を取得
 */
export async function GET(request: NextRequest) {
  try {
    // FlightAssignmentEngineインスタンス作成
    const engine = new FlightAssignmentEngine(DUMMY_DATA_PATHS);

    // エンジン初期化
    await engine.initialize();

    // 全体運航割り当て実行
    await engine.assignAllFlights();

    // 割り当て結果取得
    const assignedFlights = engine.getAssignedFlights();

    // レスポンスデータ構造
    const responseData = {
      message: "Flight assignment result retrieved successfully",
      timestamp: new Date(),
      assignedFlightsCount: assignedFlights.length,
      assignedFlights: assignedFlights.map((flight) => ({
        outbound: flight.outbound,
        inbound: flight.inbound,
        assignmentTime: flight.assignmentTime,
      })),
    };

    // スキーマ検証
    const validatedResponse = getResultResponseSchema.parse(responseData);

    return NextResponse.json(validatedResponse, { status: 200 });
  } catch (error) {
    console.error("API execution error:", error);

    return NextResponse.json(
      {
        error: "Failed to retrieve flight assignment result",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
