import { FlightData } from "../loader";
import { AssignedFlight } from "../flightAssignmentEngine";
import { ParsedAirportScheduleData } from "../types";
import {
  checkAirportScheduleAvailability,
  checkMaxFlightCount,
} from "../helpers";

/**
 * 往路運航候補をフィルタリングする関数群
 */

/**
 * 往路運航候補をフィルタリングするメイン関数
 * @param outbound 往路運航候補
 * @param airportScheduleData 空港スケジュールデータ
 * @param assignedFlights 既に割り当て済みの運航
 * @returns 全てのチェックを通過したかどうか
 */
export function filterOutboundFlight(
  outbound: FlightData,
  airportScheduleData: ParsedAirportScheduleData,
  assignedFlights: AssignedFlight[]
): boolean {
  // チェック2: 空港スケジュール可用性
  if (!checkAirportScheduleAvailability(outbound, airportScheduleData)) {
    return false;
  }

  // チェック3: 最大運航数
  if (!checkMaxFlightCount(outbound, assignedFlights, "outbound")) {
    return false;
  }

  // チェック1は復路と一緒にチェックする必要があるのでここでは通過
  return true;
}
