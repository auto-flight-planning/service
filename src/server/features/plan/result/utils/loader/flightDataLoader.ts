import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// CSV의 모든 컬럼을 포함한 인터페이스
export interface FlightData {
  日付: string; // 日付 (예: "1日", "2日")
  出発国家: string; // 出発国家
  出発空港: string; // 出発空港
  到着国家: string; // 到着国家
  到着空港: string; // 到着空港
  出発時刻: string; // 出発時刻 (예: "07:00", "14:30")
  飛行時間: number; // 飛行時間 (분)
  推奨最大運航数: number; // 推奨最大運航数
  "収益(円)": number; // 収益(円)
  "価格(円)": number; // 価格(円)
  "需要(名)": number; // 需要(名)
  運航規模: string; // 運航規模
  座席数: number; // 座席数
  "運航可能な最小収益(円)": number; // 運航可能な最小収益(円)
  必要機長数: number; // 必要機長数
  必要副操縦士数: number; // 必要副操縦士数
  その他必要人員指数: number; // その他必要人員指数
  飛行前必要時間: number; // 飛行前必要時間 (분)
  飛行後必要時間: number; // 飛行後必要時間 (분)
  優先順位指数: number; // 優先順位指数
}

// 往路 데이터 (우선순위 내림차순 정렬됨)
export type OutboundFlights = FlightData[];

// International 復路 데이터 구조 (출발국가별 > 출발공항별로 그룹화)
export type InternationalInboundFlights = {
  [departureCountry: string]: {
    [departureAirport: string]: FlightData[];
  };
};

// Domestic 復路 데이터
export type DomesticInboundFlights = FlightData[];

// 로드된 전체 데이터
export interface LoadedFlightData {
  outbound: OutboundFlights; // 往路 (international + domestic, 우선순위 내림차순 정렬됨)
  internationalInbound: InternationalInboundFlights; // International 復路 (출발국가별 > 출발공항별로 그룹화, 각 그룹 내에서 우선순위 내림차순 정렬됨)
  domesticInbound: DomesticInboundFlights; // Domestic 復路 (우선순위 내림차순 정렬됨)
}

/**
 * CSV 파일을 로드하고 파싱하는 함수
 * @param filePath CSV 파일 경로
 * @returns 파싱된 데이터 배열
 */
async function loadCSVData(filePath: string): Promise<FlightData[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // 데이터 타입 변환 (문자열을 숫자로)
    return records.map((record: any) => ({
      ...record,
      飛行時間: Number(record.飛行時間),
      優先順位指数: Number(record.優先順位指数),
      飛行前必要時間: Number(record.飛行前必要時間),
      飛行後必要時間: Number(record.飛行後必要時間),
      推奨最大運航数: Number(record.推奨最大運航数),
      "収益(円)": Number(record["収益(円)"]),
      "価格(円)": Number(record["価格(円)"]),
      "需要(名)": Number(record["需要(名)"]),
      座席数: Number(record.座席数),
      "運航可能な最小収益(円)": Number(record["運航可能な最小収益(円)"]),
      必要機長数: Number(record.必要機長数),
      必要副操縦士数: Number(record.必要副操縦士数),
      その他必要人員指数: Number(record.その他必要人員指数),
    }));
  } catch (error) {
    console.error(`CSV 파일 로드 실패 (${filePath}):`, error);
    throw new Error(`CSV 파일 로드를 실패했습니다: ${filePath}`);
  }
}

/**
 * CSV 파일들을 로드하고 往路와 復路를 분리하여 정렬하는 함수
 * @param internationalDeparturePath international_departure.csv 파일 경로
 * @param internationalArrivalPath international_arrival.csv 파일 경로
 * @param domesticPath domestic_all.csv 파일 경로
 * @returns 로드된 운항 데이터 (往路, 復路 분리 및 정렬 완료)
 */
export async function loadAndProcessFlightData(
  internationalDeparturePath: string,
  internationalArrivalPath: string,
  domesticPath: string
): Promise<LoadedFlightData> {
  try {
    console.log("CSV 파일들 로드 시작...");

    // CSV 파일들 로드 (병렬 처리)
    const [internationalDepartures, internationalArrivals, domesticFlights] =
      await Promise.all([
        loadCSVData(internationalDeparturePath),
        loadCSVData(internationalArrivalPath),
        loadCSVData(domesticPath),
      ]);

    console.log(
      `International 출발 데이터: ${internationalDepartures.length}건`
    );
    console.log(`International 도착 데이터: ${internationalArrivals.length}건`);
    console.log(`Domestic 데이터: ${domesticFlights.length}건`);

    // 往路 구성 (international 출발 + domestic)
    const outbound: FlightData[] = [
      ...internationalDepartures,
      ...domesticFlights,
    ];

    // 往路를 우선순위 지수 기준으로 내림차순 정렬
    outbound.sort((a, b) => b.優先順位指数 - a.優先順位指数);

    // International 復路를 출발국가별 > 출발공항별로 그룹화하고 각 그룹 내에서 우선순위 정렬
    const internationalInbound: InternationalInboundFlights = {};

    // 출발국가별로 그룹화
    const countryGroups: { [key: string]: FlightData[] } = {};
    internationalArrivals.forEach((flight) => {
      if (!countryGroups[flight.出発国家]) {
        countryGroups[flight.出発国家] = [];
      }
      countryGroups[flight.出発国家].push(flight);
    });

    // 각 국가 그룹 내에서 출발공항별로 그룹화하고 우선순위 정렬
    Object.keys(countryGroups).forEach((country) => {
      internationalInbound[country] = {};
      const countryFlights = countryGroups[country];

      // 출발공항별로 그룹화
      const airportGroups: { [key: string]: FlightData[] } = {};
      countryFlights.forEach((flight) => {
        if (!airportGroups[flight.出発空港]) {
          airportGroups[flight.出発空港] = [];
        }
        airportGroups[flight.出発空港].push(flight);
      });

      // 각 공항 그룹 내에서 우선순위 정렬
      Object.keys(airportGroups).forEach((airport) => {
        airportGroups[airport].sort((a, b) => b.優先順位指数 - a.優先順位指数);
        internationalInbound[country][airport] = airportGroups[airport];
      });
    });

    // Domestic 復路를 우선순위 지수 기준으로 내림차순 정렬
    const domesticInbound: DomesticInboundFlights = [...domesticFlights].sort(
      (a, b) => b.優先順位指数 - a.優先順位指数
    );

    console.log("운항 데이터 로드 및 정렬 완료");

    return {
      outbound,
      internationalInbound,
      domesticInbound,
    };
  } catch (error) {
    console.error("운항 데이터 로드 중 오류 발생:", error);
    throw new Error("운항 데이터 로드를 실패했습니다.");
  }
}
