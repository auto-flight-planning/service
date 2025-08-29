import { FlightData } from "./loader/flightDataLoader";

/**
 * 왕복 우선순위 지수를 계산하는 함수
 * @param outbound 往路 운항 데이터
 * @param inbound 復路 운항 데이터
 * @returns 왕복 우선순위 지수
 */
export function calculateRoundTripPriority(
  outbound: FlightData,
  inbound: FlightData
): number {
  try {
    // round_trip_priority_normalizer.ts의 함수를 동적으로 import
    // 실제 구현에서는 해당 함수를 직접 import하여 사용
    const roundTripPriorityNormalizer = require("../../../../../dummy/airline_01/analytics_data/round_trip_priority_normalizer");

    // round_trip_priority_normalizer.ts에서 사용하는 FlightData 형태로 데이터 변환
    const outboundData = {
      日付: outbound.日付,
      出発時刻: outbound.出発時刻,
      飛行時間: outbound.飛行時間,
      優先順位指数: outbound.優先順位指数,
      飛行前必要時間: outbound.飛行前必要時間,
      飛行後必要時間: outbound.飛行後必要時間,
    };

    const inboundData = {
      日付: inbound.日付,
      出発時刻: inbound.出発時刻,
      飛行時間: inbound.飛行時間,
      優先順位指数: inbound.優先順位指数,
      飛行前必要時間: inbound.飛行前必要時間,
      飛行後必要時間: inbound.飛行後必要時間,
    };

    // normalizeRoundTripPriority 함수 호출 (default export이므로 직접 호출)
    const result = roundTripPriorityNormalizer(outboundData, inboundData);

    // NormalizedResult.score 반환 (0-100 범위)
    return result.score;
  } catch (error) {
    console.error("왕복 우선순위 지수 계산 중 오류 발생:", error);
    // 오류 발생 시 기본값 반환 (우선순위가 낮음을 의미)
    return 0;
  }
}

/**
 * 필터링된 復路 후보들 중에서 최적의 復路를 선택하는 함수
 * @param outbound 배정된 往路
 * @param filteredInbounds 필터링된 復路 후보들
 * @returns 최적의 復路 (왕복 우선순위 지수가 가장 높은 것)
 */
export function selectOptimalInbound(
  outbound: FlightData,
  filteredInbounds: FlightData[]
): FlightData | null {
  if (filteredInbounds.length === 0) {
    return null;
  }

  let optimalInbound = filteredInbounds[0];
  let maxPriority = calculateRoundTripPriority(outbound, optimalInbound);

  // 모든 후보들 중에서 왕복 우선순위 지수가 가장 높은 것 선택
  for (let i = 1; i < filteredInbounds.length; i++) {
    const currentPriority = calculateRoundTripPriority(
      outbound,
      filteredInbounds[i]
    );
    if (currentPriority > maxPriority) {
      maxPriority = currentPriority;
      optimalInbound = filteredInbounds[i];
    }
  }

  return optimalInbound;
}
