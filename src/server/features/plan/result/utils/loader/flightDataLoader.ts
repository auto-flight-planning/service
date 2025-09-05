import fs from "fs";
import { parse } from "csv-parse/sync";
import { FlightCandidateData } from "../types";

// Outbound : 往路, Inbound : 復路
export type OutboundFlightCandidates = FlightCandidateData[];
export type InternationalInboundFlightCandidates = {
  [departureCountry: string]: {
    [departureAirport: string]: FlightCandidateData[];
  };
};
export type DomesticInboundFlightCandidates = FlightCandidateData[];
export interface LoadedFlightCandidateData {
  outbound: OutboundFlightCandidates;
  internationalInbound: InternationalInboundFlightCandidates;
  domesticInbound: DomesticInboundFlightCandidates;
}

async function loadCSVData(filePath: string): Promise<FlightCandidateData[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    return records.map((record: any) => ({
      ...record,
      日付: Number(record.日付.replace("日", "")),
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
    console.error(`CSVファイルロード失敗（${filePath}）:`, error);
    throw new Error(`CSVファイルロードに失敗しました: ${filePath}`);
  }
}

/**
 * CSVファイル群をロードして往路と復路を分離してソートする関数
 * @param internationalDeparturePath international_departure.csvファイルパス
 * @param internationalArrivalPath international_arrival.csvファイルパス
 * @param domesticPath domestic_all.csvファイルパス
 * @returns ロードされた運航データ（往路、復路分離及びソート完了）
 */
export async function loadAndProcessFlightData(
  internationalDeparturePath: string,
  internationalArrivalPath: string,
  domesticPath: string
): Promise<LoadedFlightData> {
  try {
    // CSV 파일들 로드 (병렬 처리)
    const [internationalDepartures, internationalArrivals, domesticFlights] =
      await Promise.all([
        loadCSVData(internationalDeparturePath),
        loadCSVData(internationalArrivalPath),
        loadCSVData(domesticPath),
      ]);

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
