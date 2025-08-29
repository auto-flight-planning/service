/**
 * 공항 스케줄 데이터 관련 타입 정의
 */

/**
 * 시간대별 배정 가능 횟수 정보
 */
export interface TimeSlotAvailability {
  時間帯: string; // 예: "07:00 ~ 07:30"
  割り当て可能回数: number; // 예: 6
}

/**
 * 공항 스케줄 데이터의 한 행
 */
export interface AirportScheduleRow {
  国: string; // 국가 (예: "日本")
  空港: string; // 공항명 (예: "福岡")
  日付: string; // 날짜 (예: "1日", "2日")
  "割り当て可能時間帯（割り当て可能回数）": string; // JSON 문자열
}

/**
 * 파싱된 공항 스케줄 데이터
 * 키: "국가_공항명_날짜" 형태
 * 값: TimeSlotAvailability[] 배열
 */
export interface ParsedAirportScheduleData {
  [scheduleKey: string]: TimeSlotAvailability[];
}

/**
 * 공항 스케줄 데이터를 파싱하는 함수의 반환 타입
 */
export interface AirportScheduleData {
  rawData: AirportScheduleRow[];
  parsedData: ParsedAirportScheduleData;
}
