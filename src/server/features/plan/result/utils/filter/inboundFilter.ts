import { FlightData } from "../loader";
import { AssignedFlight } from "../flightAssignmentEngine";
import {
  checkAirportScheduleAvailability,
  checkMaxFlightCount,
  getMinResourceValues,
} from "../helpers";
import { ParsedAirportScheduleData } from "../types";
import { ResourceTimeGrid, ResourceTimeGridVariables } from "../timeGridUtils";

/**
 * 往路 배정 후 復路를 필터링하는 함수
 * @param assignedOutbound 배정된 往路 운항
 * @param candidateInbounds 필터링할 復路 후보들
 * @param airportScheduleData 공항 스케줄 데이터
 * @param assignedFlights 이미 배정된 운항들
 * @param resourceTimeGridVariables 자원 시간 그리드 변수
 * @returns 필터링된 復路 후보들
 */
export function filterInboundFlights(
  assignedOutbound: FlightData,
  candidateInbounds: FlightData[],
  airportScheduleData: ParsedAirportScheduleData,
  assignedFlights: AssignedFlight[],
  resourceTimeGridVariables: ResourceTimeGridVariables,
  internalResourceData: any
): FlightData[] {
  return candidateInbounds.filter((inbound) => {
    // 1번 조건은 이미 findCandidateInbounds에서 체크됨 (중복 제거)

    // 2번 조건: 시간 조건 체크
    if (!checkTimeConstraint(assignedOutbound, inbound)) {
      return false;
    }

    // 3번 조건: 자원 조건 체크
    if (!checkResourceConstraint(assignedOutbound, inbound)) {
      return false;
    }

    // 체크2: 공항 스케줄 가용성
    if (!checkAirportScheduleAvailability(inbound, airportScheduleData)) {
      return false;
    }

    // 체크3: 최대 운항수
    if (!checkMaxFlightCount(inbound, assignedFlights, "inbound")) {
      return false;
    }

    // 체크1: 자원 가용성 (가장 복잡한 체크)
    if (
      !checkResourceAvailability(
        assignedOutbound,
        inbound,
        resourceTimeGridVariables,
        internalResourceData
      )
    ) {
      return false;
    }

    return true;
  });
}

/**
 * 시간 제약 조건을 체크하는 함수
 * @param outbound 배정된 往路
 * @param inbound 체크할 復路
 * @returns 시간 조건 만족 여부
 */
function checkTimeConstraint(
  outbound: FlightData,
  inbound: FlightData
): boolean {
  // 往路의 날짜와 출발시각을 합쳐서 Date 객체 생성
  const outboundDate = new Date(
    `2025-09-${outbound.日付.replace("日", "")}T${outbound.出発時刻}:00`
  );

  // 往路 비행 완료 시각 계산 (Date 객체)
  // A = 往路 출발시각 + 往路 비행시간 + 往路 비행후필요시간
  const timeA = new Date(
    outboundDate.getTime() +
      (outbound.飛行時間 + outbound.飛行後必要時間) * 60 * 1000
  );

  // 復路의 날짜와 출발시각을 합쳐서 Date 객체 생성
  const inboundDate = new Date(
    `2025-09-${inbound.日付.replace("日", "")}T${inbound.出発時刻}:00`
  );

  // B = 復路 출발시각 - 復路 비행전필요시간 (Date 객체)
  const timeB = new Date(
    inboundDate.getTime() - inbound.飛行前必要時間 * 60 * 1000
  );

  // A < B 여야 함 (Date 객체 비교)
  return timeA < timeB;
}

/**
 * 자원 제약 조건을 체크하는 함수
 * @param outbound 배정된 往路
 * @param inbound 체크할 復路
 * @returns 자원 조건 만족 여부
 */
function checkResourceConstraint(
  outbound: FlightData,
  inbound: FlightData
): boolean {
  // 運航規模가 동일해야 함 (항공기 자원 체크를 위해)
  const aircraftScaleCheck = outbound.運航規模 === inbound.運航規模;

  // 往路의 필요 자원이 復路의 필요 자원보다 크거나 같아야 함
  // 항공기 자원 체크를 위해 필요 자원 수량 비교
  const captainCheck = outbound.必要機長数 >= inbound.必要機長数;
  const secondCaptainCheck = outbound.必要副操縦士数 >= inbound.必要副操縦士数;
  const otherWorkerCheck =
    outbound.その他必要人員指数 >= inbound.その他必要人員指数;

  return (
    aircraftScaleCheck && captainCheck && secondCaptainCheck && otherWorkerCheck
  );
}

/**
 * 체크1: 자원 가용성 체크 (가장 복잡한 체크)
 * @param outbound 往路 운항
 * @param inbound 復路 운항
 * @param resourceTimeGridVariables 자원 시간 그리드 변수
 * @param internalResourceDataPath internal_resource_data.json 파일 경로
 * @returns 자원 가용성 만족 여부
 */
function checkResourceAvailability(
  outbound: FlightData,
  inbound: FlightData,
  resourceTimeGridVariables: ResourceTimeGridVariables,
  internalResourceData: any
): boolean {
  try {
    // 往路의 출발 시각 - 비행전필요시간부터 復路의 출발 시각 + 비행시간 + 비행후필요시간까지의 기간 계산
    const outboundDate = new Date(
      `2025-09-${outbound.日付.replace("日", "")}T${outbound.出発時刻}:00`
    );
    const startTime = new Date(
      outboundDate.getTime() - outbound.飛行前必要時間 * 60 * 1000
    );

    const inboundDate = new Date(
      `2025-09-${inbound.日付.replace("日", "")}T${inbound.出発時刻}:00`
    );
    const endTime = new Date(
      inboundDate.getTime() +
        inbound.飛行時間 * 60 * 1000 +
        inbound.飛行後必要時間 * 60 * 1000
    );

    // 필요한 자원들 (往路 기준으로 사용)
    const requiredCaptain = outbound.必要機長数;
    const requiredSecondCaptain = outbound.必要副操縦士数;
    const requiredOtherWorker = outbound.その他必要人員指数;
    const requiredAircraftScale = outbound.運航規模; // 往路의 운항규모 사용

    // 각 자원에 대해 가용성 체크
    const captainAvailable = checkResourceAvailabilityForPeriod(
      "captain",
      resourceTimeGridVariables.captain_time_grid,
      startTime,
      endTime,
      requiredCaptain
    );
    if (!captainAvailable) {
      console.log(
        `자원 가용성 체크 중 오류: ${startTime} ~ ${endTime} 동안 기장 자원 부족`
      );
      return false;
    }

    const secondCaptainAvailable = checkResourceAvailabilityForPeriod(
      "secondCaptain",
      resourceTimeGridVariables.second_captain_time_grid,
      startTime,
      endTime,
      requiredSecondCaptain
    );
    if (!secondCaptainAvailable) {
      console.log(
        `자원 가용성 체크 중 오류: ${startTime} ~ ${endTime} 동안 부기장 자원 부족`
      );
      return false;
    }

    const otherWorkerAvailable = checkResourceAvailabilityForPeriod(
      "otherWorker",
      resourceTimeGridVariables.other_workers_index_time_grid,
      startTime,
      endTime,
      requiredOtherWorker
    );
    if (!otherWorkerAvailable) {
      console.log(
        `자원 가용성 체크 중 오류: ${startTime} ~ ${endTime} 동안 인력 자원 부족`
      );
      return false;
    }

    // 항공기 자원 가용성 체크
    const aircraftAvailable = checkResourceAvailabilityForPeriod(
      "aircraft",
      resourceTimeGridVariables[`${requiredAircraftScale}_aircraft_time_grid`],
      startTime,
      endTime,
      1, // 항공기는 1대씩
      true, // 항공기 자원이므로 待機航空機最小数 체크
      requiredAircraftScale, // 운항규모 전달
      internalResourceData // internal_resource_data.json 경로 전달
    );
    if (!aircraftAvailable) {
      console.log(
        `자원 가용성 체크 중 오류: ${startTime} ~ ${endTime} 동안 항공기 자원 부족`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("자원 가용성 체크 중 오류:", error);
    return false;
  }
}

/**
 * internal_resource_data.json에서 운항규모별 최소 대기 항공기 수를 가져오는 함수
 * @param aircraftScale 운항규모
 * @param internalResourceDataPath internal_resource_data.json 파일 경로
 * @returns 최소 대기 항공기 수
 */
function getMinStandbyAircraftCount(
  aircraftScale: string,
  internalResourceData: any
): number {
  try {
    // 운항규모별 데이터에서 동적으로 최소 대기 항공기 수 조회
    if (
      internalResourceData.運航規模別データ &&
      internalResourceData.運航規模別データ[aircraftScale]
    ) {
      return internalResourceData.運航規模別データ[aircraftScale]
        .待機航空機最小数;
    }

    console.warn(`알 수 없는 운항규모: ${aircraftScale}`);
    return 0; // 기본값 0
  } catch (error) {
    console.error("최소 대기 항공기 수 조회 중 오류:", error);
    return 0; // 오류 시 기본값 0
  }
}

/**
 * 특정 기간 동안의 자원 가용성을 체크하는 헬퍼 함수
 * @param resourceGrid 해당 자원의 시간 그리드
 * @param startTime 시작 시각 (往路 출발시각 - 비행전필요시간)
 * @param endTime 종료 시각 (復路 출발시각 + 비행시간 + 비행후필요시간)
 * @param requiredAmount 필요한 자원 수량
 * @param isAircraft 항공기 자원인지 여부 (待機航空機最小数 체크용)
 * @param aircraftScale 운항규모 (항공기 자원인 경우 필요)
 * @param internalResourceDataPath internal_resource_data.json 파일 경로
 * @returns 가용성 만족 여부
 */
function checkResourceAvailabilityForPeriod(
  resourceType: string,
  resourceGrid: ResourceTimeGrid,
  startTime: Date,
  endTime: Date,
  requiredAmount: number,
  isAircraft: boolean = false,
  aircraftScale?: string,
  internalResourceData?: any
): boolean {
  try {
    const minResources = getMinResourceValues(
      internalResourceData,
      resourceType
    );

    // startTime부터 endTime까지의 모든 시간대를 체크
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // 날짜별로 반복
    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      // timeGridUtils.ts의 generateDateRange 형식에 맞춤 (YYYY-MM-DD)
      const dateKey = currentDate.toISOString().split("T")[0];

      if (!resourceGrid[dateKey]) {
        console.log(`날짜 데이터 없음: ${dateKey}`);
        return false;
      }

      // 해당 날짜의 시간대별로 체크
      for (const timeSlot of resourceGrid[dateKey]) {
        const [slotHour, slotMinute] = timeSlot.startTime;
        const slotTime = new Date(currentDate);
        slotTime.setHours(slotHour, slotMinute, 0, 0);

        // 해당 시간대가 체크 범위에 포함되는지 확인
        if (slotTime >= startTime && slotTime < endTime) {
          if (timeSlot.available < minResources) {
            console.log(
              `최소 자원 미충족: ${dateKey} ${slotHour}:${slotMinute} - available: ${timeSlot.available}, required: ${minResources}`
            );
            return false;
          }
          // 항공기인 경우 待機航空機最小数 고려
          if (isAircraft) {
            // internal_resource_data.json에서 待機航空機最小数 가져와서 체크
            const minStandbyAircraft = getMinStandbyAircraftCount(
              aircraftScale || "",
              internalResourceData
            );

            if (timeSlot.available < requiredAmount + minStandbyAircraft) {
              console.log(
                `항공기 자원 부족: ${dateKey} ${slotHour}:${slotMinute} - available: ${
                  timeSlot.available
                }, required: ${
                  requiredAmount + minStandbyAircraft
                } (운항: ${requiredAmount}, 최소대기: ${minStandbyAircraft})`
              );
              return false;
            }
          } else {
            // 인력 자원인 경우 단순 비교
            if (timeSlot.available < requiredAmount) {
              console.log(
                `인력 자원 부족: ${dateKey} ${slotHour}:${slotMinute} - available: ${timeSlot.available}, required: ${requiredAmount}`
              );
              return false;
            }
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error("자원 가용성 기간 체크 중 오류:", error);
    return false;
  }
}
