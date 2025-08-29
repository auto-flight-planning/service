/**
 * 空港スケジュールデータ関連のタイプ定義
 */

/**
 * 時間帯別割り当て可能回数情報
 */
export interface TimeSlotAvailability {
  時間帯: string; // 例: "07:00 ~ 07:30"
  割り当て可能回数: number; // 例: 6
}

/**
 * 空港スケジュールデータの一行
 */
export interface AirportScheduleRow {
  国: string; // 国家（例: "日本"）
  空港: string; // 空港名（例: "福岡"）
  日付: string; // 日付（例: "1日", "2日"）
  "割り当て可能時間帯（割り当て可能回数）": string; // JSON文字列
}

/**
 * パースされた空港スケジュールデータ
 * キー: "国家_空港名_日付"形式
 * 値: TimeSlotAvailability[]配列
 */
export interface ParsedAirportScheduleData {
  [scheduleKey: string]: TimeSlotAvailability[];
}

/**
 * 空港スケジュールデータをパースする関数の戻りタイプ
 */
export interface AirportScheduleData {
  rawData: AirportScheduleRow[];
  parsedData: ParsedAirportScheduleData;
}
