import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import {
  AirportScheduleRow,
  ParsedAirportScheduleData,
  AirportScheduleData,
} from "../types";

/**
 * 空港スケジュールデータをロードしてパースする関数
 * @param airportScheduleDataPath airport_schedule_data.csvファイルパス
 * @returns パースされた空港スケジュールデータ
 */
export async function loadAirportScheduleData(
  airportScheduleDataPath: string
): Promise<AirportScheduleData> {
  try {
    // CSVファイルパス
    const csvPath = path.join(process.cwd(), airportScheduleDataPath);

    // CSVファイル読み込み（非同期）
    const csvContent = await fs.promises.readFile(csvPath, "utf-8");

    // CSVパース
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    }) as AirportScheduleRow[];

    console.log(`空港スケジュールデータロード完了: ${records.length}件`);

    // パースされたデータ作成
    const parsedData: ParsedAirportScheduleData = {};

    records.forEach((record) => {
      const {
        国,
        空港,
        日付,
        "割り当て可能時間帯（割り当て可能回数）": timeSlotsJson,
      } = record;

      try {
        // JSON文字列をパース
        const timeSlots = JSON.parse(timeSlotsJson);

        // キー作成: "国家_空港名_日付"形式
        const scheduleKey = `${国}_${空港}_${日付}`;

        parsedData[scheduleKey] = timeSlots;
      } catch (jsonError) {
        console.error(`JSONパースエラー（${国} ${空港} ${日付}）:`, jsonError);
        // JSONパース失敗時は空配列で設定
        const scheduleKey = `${国}_${空港}_${日付}`;
        parsedData[scheduleKey] = [];
      }
    });

    console.log(
      `空港スケジュールデータパース完了: ${
        Object.keys(parsedData).length
      }個のキー`
    );

    return {
      rawData: records,
      parsedData: parsedData,
    };
  } catch (error) {
    console.error("空港スケジュールデータロード中エラー:", error);

    // エラー発生時は空データ返却
    return {
      rawData: [],
      parsedData: {},
    };
  }
}

/**
 * 特定空港・日付のスケジュールデータ照会
 * @param country 国家
 * @param airport 空港名
 * @param date 日付
 * @param parsedData パースされた空港スケジュールデータ
 * @returns 該当空港・日付の時間帯別割り当て可能回数配列
 */
export function getAirportSchedule(
  country: string,
  airport: string,
  date: string,
  parsedData: ParsedAirportScheduleData
) {
  const scheduleKey = `${country}_${airport}_${date}`;
  return parsedData[scheduleKey] || [];
}
