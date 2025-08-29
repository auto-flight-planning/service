/**
 * 공통으로 사용되는 헬퍼 함수들
 */

import fs from "fs";
import path from "path";
import { FlightData } from "./loader/flightDataLoader";

/**
 * internal_resource_data.json 파일을 읽어오는 공통 함수
 * @param internalResourceDataPath internal_resource_data.json 파일 경로
 * @returns 파싱된 자원 데이터
 */
export async function loadInternalResourceData(
  internalResourceDataPath: string
): Promise<any> {
  try {
    const dummyDataPath = path.join(process.cwd(), internalResourceDataPath);

    const dummyDataContent = await fs.promises.readFile(dummyDataPath, "utf-8");
    return JSON.parse(dummyDataContent);
  } catch (error) {
    console.error("internal_resource_data.json 읽기 실패:", error);
    throw new Error("자원 데이터 로드에 실패했습니다.");
  }
}

/**
 * internal_resource_data.json에서 최소 자원값들을 계산하는 헬퍼 함수
 * @param internalResourceData internal_resource_data.json 데이터
 * @returns 최소 자원값들
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
    console.error("최소 자원값 계산 중 오류:", error);
    return 0;
  }
}

/**
 * 시간 문자열을 분 단위로 변환하는 헬퍼 함수
 * @param timeString "HH:MM" 형태의 시간 문자열
 * @returns 분 단위 숫자
 */
export function convertTimeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * 공항 스케줄 가용성을 체크하는 공통 함수
 * @param flightData 운항 데이터 (往路 또는 復路)
 * @param airportScheduleData 공항 스케줄 데이터
 * @returns 배정 가능 여부
 */
export function checkAirportScheduleAvailability(
  flightData: FlightData,
  airportScheduleData: any
): boolean {
  try {
    const { 出発国家, 出発空港, 出発時刻 } = flightData;
    const 日付 = Object.values(flightData)[0];

    // 공항 스케줄 데이터에서 해당 국가, 공항, 날짜의 데이터 조회
    const scheduleKey = `${出発国家}_${出発空港}_${日付}`;
    const scheduleData = airportScheduleData[scheduleKey];

    if (!scheduleData) {
      console.log(`공항 스케줄 데이터 없음: ${scheduleKey}`);
      return false;
    }

    // 출발 시각에 해당하는 시간대 객체 찾기
    const timeSlot = scheduleData.find((slot: any) => {
      const [startTime, endTime] = slot.時間帯.split(" ~ ");

      // 시간을 분 단위로 변환하여 숫자 비교
      const departureMinutes = convertTimeToMinutes(出発時刻);
      const startMinutes = convertTimeToMinutes(startTime);
      const endMinutes = convertTimeToMinutes(endTime);

      return departureMinutes >= startMinutes && departureMinutes < endMinutes;
    });

    if (!timeSlot) {
      console.log(`해당 시간대 스케줄 없음: ${出発時刻}`);
      return false;
    }

    // 割り当て可能回数이 0보다 큰지 확인
    const isAvailable = timeSlot.割り当て可能回数 > 0;

    if (!isAvailable) {
      console.log(
        `공항 스케줄 배정 불가: ${出発空港} ${出発時刻} - 割り当て可能回数: ${timeSlot.割り当て可能回数}`
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
