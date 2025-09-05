type priorityGroupType = "top" | "middle" | "bottom";

export interface FlightCandidateData {
  day: number;
  departure: {
    countryCode: string;
    countryName: string;
    airportCode: string;
    airportName: string;
  };
  arrival: {
    countryCode: string;
    countryName: string;
    airportCode: string;
    airportName: string;
  };
  departureTime: string;
  flightMinutes: number; // 分
  recommendMaxFlightCnt: number;
  priority: { group: priorityGroupType; value: number };
  revenue: number;
  ticketPrice: number;
  demand: number;
  flightScale: string;
  seatCnt: number;
  requiredCaptainCnt: number;
  requiredSubCaptainCnt: number;
  requiredOtherPersonnelNorm: number;
  requiredPreFlightHours: number; // 時間
  requiredPostFlightHours: number; // 時間
  minRequiredRevenue: number;
}

export interface TimeSlotAvailability {
  時間帯: string; // 例: "07:00 ~ 07:30"
  割り当て可能回数: number; // 例: 6
}

export interface AirportScheduleRow {
  国: string; // 国家（例: "日本"）
  空港: string; // 空港名（例: "福岡"）
  日付: string; // 日付（例: "1日", "2日"）
  "割り当て可能時間帯（割り当て可能回数）": string; // JSON文字列
}
export interface ParsedAirportScheduleData {
  [scheduleKey: string]: TimeSlotAvailability[];
}

export interface AirportScheduleData {
  rawData: AirportScheduleRow[];
  parsedData: ParsedAirportScheduleData;
}
