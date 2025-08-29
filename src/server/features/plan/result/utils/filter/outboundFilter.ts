import { FlightData } from "../loader";
import { AssignedFlight } from "../flightAssignmentEngine";
import { ParsedAirportScheduleData } from "../types";
import {
  checkAirportScheduleAvailability,
  checkMaxFlightCount,
} from "../helpers";

/**
 * 往路 운항 후보를 필터링하는 함수들
 */

/**
 * 往路 운항 후보를 필터링하는 메인 함수
 * @param outbound 往路 운항 후보
 * @param airportScheduleData 공항 스케줄 데이터
 * @param assignedFlights 이미 배정된 운항들
 * @returns 모든 체크를 통과했는지 여부
 */
export function filterOutboundFlight(
  outbound: FlightData,
  airportScheduleData: ParsedAirportScheduleData,
  assignedFlights: AssignedFlight[]
): boolean {
  // 체크2: 공항 스케줄 가용성
  if (!checkAirportScheduleAvailability(outbound, airportScheduleData)) {
    return false;
  }

  // 체크3: 최대 운항수
  if (!checkMaxFlightCount(outbound, assignedFlights, "outbound")) {
    return false;
  }

  // 체크1은 復路와 함께 체크해야 하므로 여기서는 통과
  return true;
}
