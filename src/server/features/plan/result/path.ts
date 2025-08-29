// ダミーデータパス定義
export const DUMMY_DATA_PATHS = {
  // リソースデータ
  INTERNAL_RESOURCE_DATA: "src/dummy/airline_01/internal_resource_data.json",

  // 空港スケジュールデータ
  AIRPORT_SCHEDULE_DATA: "src/dummy/airline_01/airport_schedule_data.csv",

  // 月別最小運航基準
  MONTHLY_MINIMUM_OPERATIONS_STANDARD:
    "src/dummy/airline_01/monthly_minimum_operations_standard.csv",

  // 運航データ
  INTERNATIONAL_DEPARTURE:
    "src/dummy/airline_01/analytics_data/candidate/international_departure.csv",
  INTERNATIONAL_ARRIVAL:
    "src/dummy/airline_01/analytics_data/candidate/international_arrival.csv",
  DOMESTIC_ALL: "src/dummy/airline_01/analytics_data/candidate/domestic.csv",

  // 往復優先度計算機
  ROUND_TRIP_PRIORITY_NORMALIZER:
    "src/dummy/airline_01/analytics_data/round_trip_priority_normalizer.ts",
} as const;

// パスタイプ定義
export type DummyDataPaths = typeof DUMMY_DATA_PATHS;
