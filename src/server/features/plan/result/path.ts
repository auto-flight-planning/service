// 더미 데이터 경로 정의
export const DUMMY_DATA_PATHS = {
  // 자원 데이터
  INTERNAL_RESOURCE_DATA: "src/dummy/airline_01/internal_resource_data.json",

  // 공항 스케줄 데이터
  AIRPORT_SCHEDULE_DATA: "src/dummy/airline_01/airport_schedule_data.csv",

  // 월별 최소 운항 기준
  MONTHLY_MINIMUM_OPERATIONS_STANDARD:
    "src/dummy/airline_01/monthly_minimum_operations_standard.csv",

  // 운항 데이터
  INTERNATIONAL_DEPARTURE:
    "src/dummy/airline_01/analytics_data/candidate/international_departure.csv",
  INTERNATIONAL_ARRIVAL:
    "src/dummy/airline_01/analytics_data/candidate/international_arrival.csv",
  DOMESTIC_ALL: "src/dummy/airline_01/analytics_data/candidate/domestic.csv",

  // 왕복 우선순위 계산기
  ROUND_TRIP_PRIORITY_NORMALIZER:
    "src/dummy/airline_01/analytics_data/round_trip_priority_normalizer.ts",
} as const;

// 경로 타입 정의
export type DummyDataPaths = typeof DUMMY_DATA_PATHS;
