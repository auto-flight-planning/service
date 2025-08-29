/**
 * 共通で使用されるヘルパー関数
 */

import fs from "fs";
import path from "path";
import { FlightData } from "./loader/flightDataLoader";

/**
 * internal_resource_data.jsonファイルを読み込む共通関数
 * @param internalResourceDataPath internal_resource_data.jsonファイルパス
 * @returns パースされたリソースデータ
 */
export async function loadInternalResourceData(
  internalResourceDataPath: string
): Promise<any> {
  try {
    const dummyDataPath = path.join(process.cwd(), internalResourceDataPath);

    const dummyDataContent = await fs.promises.readFile(dummyDataPath, "utf-8");
    return JSON.parse(dummyDataContent);
  } catch (error) {
    console.error("internal_resource_data.json読み込み失敗:", error);
    throw new Error("リソースデータの読み込みに失敗しました。");
  }
}

/**
 * internal_resource_data.jsonから最小リソース値を計算するヘルパー関数
 * @param internalResourceData internal_resource_data.jsonデータ
 * @returns 最小リソース値
 */
export function getMinResourceValues(
  internalResourceData: any,
  resourceType: string
): number {
  try {
    const aircraftScaleData = internalResourceData.運航規模別データ;

    switch (resourceType) {
      case "captain": {
        const captainCounts: number[] = [];
        Object.values(aircraftScaleData).forEach((scaleData: any) => {
          captainCounts.push(scaleData.必要人員データ.必要機長数);
        });
        return Math.min(...captainCounts);
      }
      case "secondCaptain": {
        const secondCaptainCounts: number[] = [];
        Object.values(aircraftScaleData).forEach((scaleData: any) => {
          secondCaptainCounts.push(scaleData.必要人員データ.必要副操縦士数);
        });
        return Math.min(...secondCaptainCounts);
      }
      case "otherWorker": {
        const otherWorkerIndices: number[] = [];
        Object.values(aircraftScaleData).forEach((scaleData: any) => {
          otherWorkerIndices.push(
            scaleData.必要人員データ.その他必要人員指数[0].必要人員指数
          );
        });
        return Math.min(...otherWorkerIndices);
      }
      case "aircraft": {
        const aircraftCounts: number[] = [];
        Object.values(aircraftScaleData).forEach((scaleData: any) => {
          aircraftCounts.push(scaleData.総航空機数);
        });
        return Math.min(...aircraftCounts);
      }
      default:
        return 0;
    }
  } catch (error) {
    console.error("最小リソース値計算中エラー:", error);
    return 0;
  }
}

/**
 * 時間文字列を分単位に変換するヘルパー関数
 * @param timeString "HH:MM"形式の時間文字列
 * @returns 分単位の数字
 */
export function convertTimeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * 空港スケジュール可用性をチェックする共通関数
 * @param flightData 運航データ（往路または復路）
 * @param airportScheduleData 空港スケジュールデータ
 * @returns 割り当て可能かどうか
 */
export function checkAirportScheduleAvailability(
  flightData: FlightData,
  airportScheduleData: any
): boolean {
  try {
    const { 出発国家, 出発空港, 出発時刻 } = flightData;
    const 日付 = Object.values(flightData)[0];

    // 空港スケジュールデータから該当国家、空港、日付のデータを取得
    const scheduleKey = `${出発国家}_${出発空港}_${日付}`;
    const scheduleData = airportScheduleData[scheduleKey];

    if (!scheduleData) {
      console.log(`空港スケジュールデータなし: ${scheduleKey}`);
      return false;
    }

    // 出発時刻に該当する時間帯オブジェクトを探す
    const timeSlot = scheduleData.find((slot: any) => {
      const [startTime, endTime] = slot.時間帯.split(" ~ ");

      // 時間を分単位に変換して数字比較
      const departureMinutes = convertTimeToMinutes(出発時刻);
      const startMinutes = convertTimeToMinutes(startTime);
      const endMinutes = convertTimeToMinutes(endTime);

      return departureMinutes >= startMinutes && departureMinutes < endMinutes;
    });

    if (!timeSlot) {
      console.log(`該当時間帯スケジュールなし: ${出発時刻}`);
      return false;
    }

    // 割り当て可能回数が0より大きいか確認
    const isAvailable = timeSlot.割り当て可能回数 > 0;

    if (!isAvailable) {
      console.log(
        `空港スケジュール割り当て不可: ${出発空港} ${出発時刻} - 割り当て可能回数: ${timeSlot.割り当て可能回数}`
      );
    }

    return isAvailable;
  } catch (error) {
    console.error("공항 스케줄 체크 중 오류:", error);
    return false;
  }
}

/**
 * 해당 날짜・노선의 추천 최대 운항수를 초과하지 않는지 확인하는 공통 함수
 * @param flightData 운항 데이터 (往路 또는 復路)
 * @param assignedFlights 이미 배정된 운항들
 * @param flightType "outbound" 또는 "inbound" (어떤 배열에서 검색할지 구분)
 * @returns 배정 가능 여부
 */
export function checkMaxFlightCount(
  flightData: {
    日付: string;
    出発国家: string;
    出発空港: string;
    出発時刻: string;
    到着国家: string;
    到着空港: string;
    推奨最大運航数: number;
  },
  assignedFlights: any[],
  flightType: "outbound" | "inbound"
): boolean {
  try {
    const {
      日付,
      出発国家,
      出発空港,
      出発時刻,
      到着国家,
      到着空港,
      推奨最大運航数,
    } = flightData;

    // 이미 배정된 운항들 중에서 같은 날짜, 같은 노선(출발지-도착지), 같은 출발시각인 것들의 개수 계산
    const sameRouteCount = assignedFlights.filter((flight) => {
      const assignedFlight =
        flightType === "outbound" ? flight.outbound : flight.inbound;
      if (!assignedFlight) return false;

      return (
        assignedFlight.日付 === 日付 &&
        assignedFlight.出発国家 === 出発国家 &&
        assignedFlight.出発空港 === 出発空港 &&
        assignedFlight.到着国家 === 到着国家 &&
        assignedFlight.到着空港 === 到着空港 &&
        assignedFlight.出発時刻 === 出発時刻
      );
    }).length;

    // 추천 최대 운항수와 비교
    const isAvailable = sameRouteCount < 推奨最大運航数;

    if (!isAvailable) {
      console.log(
        `최대 운항수 초과: ${出発空港} → ${到着空港} (${日付}) - 현재: ${sameRouteCount}, 최대: ${推奨最大運航数}`
      );
    }

    return isAvailable;
  } catch (error) {
    console.error("최대 운항수 체크 중 오류:", error);
    return false;
  }
}
