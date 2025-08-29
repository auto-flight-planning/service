import { FlightData } from "./loader/flightDataLoader";

/**
 * 往復優先度指数を計算する関数
 * @param outbound 往路運航データ
 * @param inbound 復路運航データ
 * @returns 往復優先度指数
 */
export function calculateRoundTripPriority(
  outbound: FlightData,
  inbound: FlightData
): number {
  try {
    // round_trip_priority_normalizer.tsの関数を動的にimport
    // 実際の実装では該当関数を直接importして使用
    const roundTripPriorityNormalizer = require("../../../../../dummy/airline_01/analytics_data/round_trip_priority_normalizer");

    // round_trip_priority_normalizer.tsで使用するFlightData形式にデータ変換
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

    // normalizeRoundTripPriority関数呼び出し（default exportなので直接呼び出し）
    const result = roundTripPriorityNormalizer(outboundData, inboundData);

    // NormalizedResult.score返却（0-100範囲）
    return result.score;
  } catch (error) {
    console.error("往復優先度指数計算中エラー発生:", error);
    // エラー発生時はデフォルト値返却（優先度が低いことを意味）
    return 0;
  }
}

/**
 * フィルタリングされた復路候補の中から最適な復路を選択する関数
 * @param outbound 割り当て済み往路
 * @param filteredInbounds フィルタリングされた復路候補
 * @returns 最適な復路（往復優先度指数が最も高いもの）
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

  // 全ての候補の中から往復優先度指数が最も高いものを選択
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
