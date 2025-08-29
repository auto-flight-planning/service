import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// CSVの全てのカラムを含むインターフェース
export interface FlightData {
  日付: string; // 日付（例: "1日", "2日"）
  出発国家: string; // 出発国家
  出発空港: string; // 出発空港
  到着国家: string; // 到着国家
  到着空港: string; // 到着空港
  出発時刻: string; // 出発時刻（例: "07:00", "14:30"）
  飛行時間: number; // 飛行時間（分）
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
  飛行前必要時間: number; // 飛行前必要時間（分）
  飛行後必要時間: number; // 飛行後必要時間（分）
  優先順位指数: number; // 優先順位指数
}

// 往路データ（優先度降順ソート済み）
export type OutboundFlights = FlightData[];

// International復路データ構造（出発国家別 > 出発空港別でグループ化）
export type InternationalInboundFlights = {
  [departureCountry: string]: {
    [departureAirport: string]: FlightData[];
  };
};

// Domestic復路データ
export type DomesticInboundFlights = FlightData[];

// ロードされた全体データ
export interface LoadedFlightData {
  outbound: OutboundFlights; // 往路（international + domestic、優先度降順ソート済み）
  internationalInbound: InternationalInboundFlights; // International復路（出発国家別 > 出発空港別でグループ化、各グループ内で優先度降順ソート済み）
  domesticInbound: DomesticInboundFlights; // Domestic復路（優先度降順ソート済み）
}

/**
 * CSVファイルをロードしてパースする関数
 * @param filePath CSVファイルパス
 * @returns パースされたデータ配列
 */
async function loadCSVData(filePath: string): Promise<FlightData[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // データタイプ変換（文字列を数字に）
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
    console.log("CSVファイル群ロード開始...");

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
