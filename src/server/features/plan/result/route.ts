import { NextRequest, NextResponse } from "next/server";
import { FlightAssignmentEngine } from "./utils/flightAssignmentEngine";
import { DUMMY_DATA_PATHS } from "./path";
import { getResultResponseSchema } from "./schema";

/**
 * GET /api/plan/result
 * Get flight assignment result
 */
export async function GET(request: NextRequest) {
  try {
    // FlightAssignmentEngine 인스턴스 생성
    const engine = new FlightAssignmentEngine(DUMMY_DATA_PATHS);

    // 엔진 초기화
    await engine.initialize();

    // 전체 운항 배정 수행
    await engine.assignAllFlights();

    // 배정 결과 가져오기
    const assignedFlights = engine.getAssignedFlights();

    // 응답 데이터 구조
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

    // 스키마 검증
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
