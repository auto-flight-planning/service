import { loadInternalResourceData } from "./helpers";

// リソース別時間グリッド変数のタイプ定義
export type TimeSlot = {
  startTime: [number, number]; // [hour, minute]形式（例: [3, 30] = 午前3時30分）
  endTime: [number, number]; // [hour, minute]形式（例: [4, 0] = 午前4時0分）
  available: number;
};

export type DailyTimeGrid = TimeSlot[];

export type ResourceTimeGrid = {
  [date: string]: DailyTimeGrid;
};

// リソース別時間グリッド変数を保存するオブジェクト
export type ResourceTimeGridVariables = {
  [resourceName: string]: ResourceTimeGrid;
};

/**
 * 30分単位時間スロットを生成する関数
 * @returns 30分単位で分割された時間スロット配列（00:00~00:30から23:30~24:00まで）
 */
export function generateTimeSlots(): Array<[number, number]> {
  const slots: Array<[number, number]> = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push([hour, minute]);
    }
  }
  return slots;
}

/**
 * 31日間の日付配列を生成する関数
 * @param baseDate 基準日付（デフォルト: 2025-09-01）
 * @returns 31日間の日付配列
 */
export function generateDateRange(baseDate: string = "2025-09-01"): string[] {
  const dates: string[] = [];
  const base = new Date(baseDate);

  for (let i = 0; i < 31; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    dates.push(dateString);
  }

  return dates;
}

/**
 * リソース別時間グリッド変数を初期化する関数
 * @param resourceName リソース名
 * @param initialAmount 初期利用可能リソース数
 * @param dates 日付配列
 * @param timeSlots 時間スロット配列
 * @returns 初期化されたリソース別時間グリッド
 */
export function initializeResourceTimeGrid(
  resourceName: string,
  initialAmount: number,
  dates: string[],
  timeSlots: Array<[number, number]>
): ResourceTimeGrid {
  const timeGrid: ResourceTimeGrid = {};

  dates.forEach((date) => {
    timeGrid[date] = timeSlots.map((slot) => {
      const [startHour, startMinute] = slot;
      let endHour = startHour;
      let endMinute = startMinute + 30;

      if (endMinute >= 60) {
        endHour = (startHour + 1) % 24;
        endMinute = 0;
      }

      return {
        startTime: [startHour, startMinute],
        endTime: [endHour, endMinute],
        available: initialAmount,
      };
    });
  });

  return timeGrid;
}

/**
 * ダミーデータからリソース情報を読み込んでリソース別時間グリッド変数を初期化する関数
 * @param internalResourceDataPath internal_resource_data.jsonファイルパス
 * @returns 初期化された全てのリソース別時間グリッド変数
 */
export async function initializeResourceTimeGridVariables(
  internalResourceDataPath: string
): Promise<ResourceTimeGridVariables> {
  try {
    // 공통 함수를 사용하여 자원 데이터 로드
    const dummyData = await loadInternalResourceData(internalResourceDataPath);

    // 시간 슬롯과 날짜 범위 생성
    const timeSlots = generateTimeSlots();
    const dates = generateDateRange();

    const resourceTimeGridVariables: ResourceTimeGridVariables = {};

    // 1. 기장 시간그리드 초기화
    const captainCount = dummyData.総人員データ.総機長数;
    resourceTimeGridVariables["captain_time_grid"] = initializeResourceTimeGrid(
      "captain",
      captainCount,
      dates,
      timeSlots
    );

    // 2. 부기장 시간그리드 초기화
    const secondCaptainCount = dummyData.総人員データ.総副操縦士数;
    resourceTimeGridVariables["second_captain_time_grid"] =
      initializeResourceTimeGrid(
        "second_captain",
        secondCaptainCount,
        dates,
        timeSlots
      );

    // 3. 그외 총인력 지수 시간그리드 초기화
    const otherWorkersIndex = dummyData.総人員データ.その他総人員指数;
    resourceTimeGridVariables["other_workers_index_time_grid"] =
      initializeResourceTimeGrid(
        "other_workers_index",
        otherWorkersIndex,
        dates,
        timeSlots
      );

    // 4. 항공기 규모별 시간그리드 초기화 (동적으로 파악)
    const aircraftScales = dummyData.運航規模種類;
    aircraftScales.forEach((scale: string) => {
      const aircraftCount = dummyData.運航規模別データ[scale].総航空機数;
      const resourceName = `${scale}_aircraft_time_grid`;

      resourceTimeGridVariables[resourceName] = initializeResourceTimeGrid(
        `${scale}_aircraft`,
        aircraftCount,
        dates,
        timeSlots
      );
    });

    return resourceTimeGridVariables;
  } catch (error) {
    console.error(
      "더미 데이터 읽기 또는 자원별 시간그리드 변수 초기화 중 오류 발생:",
      error
    );
    throw new Error("자원별 시간그리드 변수 초기화에 실패했습니다.");
  }
}
