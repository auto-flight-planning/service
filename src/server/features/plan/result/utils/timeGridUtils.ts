import { loadInternalResourceData } from "./helpers";

// 자원별 시간그리드 변수 타입 정의
export type TimeSlot = {
  startTime: [number, number]; // [hour, minute] 형태 (예: [3, 30] = 오전 3시 30분)
  endTime: [number, number]; // [hour, minute] 형태 (예: [4, 0] = 오전 4시 0분)
  available: number;
};

export type DailyTimeGrid = TimeSlot[];

export type ResourceTimeGrid = {
  [date: string]: DailyTimeGrid;
};

// 자원별 시간그리드 변수들을 저장할 객체
export type ResourceTimeGridVariables = {
  [resourceName: string]: ResourceTimeGrid;
};

/**
 * 30분 단위 시간 슬롯을 생성하는 함수
 * @returns 30분 단위로 나눈 시간 슬롯 배열 (00:00~00:30부터 23:30~24:00까지)
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
 * 31일간의 날짜 배열을 생성하는 함수
 * @param baseDate 기준 날짜 (기본값: 2025-09-01)
 * @returns 31일간의 날짜 배열
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
 * 자원별 시간그리드 변수를 초기화하는 함수
 * @param resourceName 자원 이름
 * @param initialAmount 초기 가용 자원 수
 * @param dates 날짜 배열
 * @param timeSlots 시간 슬롯 배열
 * @returns 초기화된 자원별 시간그리드
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
 * 더미 데이터에서 자원 정보를 읽어와서 자원별 시간그리드 변수를 초기화하는 함수
 * @param internalResourceDataPath internal_resource_data.json 파일 경로
 * @returns 초기화된 모든 자원별 시간그리드 변수들
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
