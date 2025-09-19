import {
  loadAndProcessFlightData,
  LoadedFlightData,
  FlightData,
} from "./loader/flightDataLoader";
import {
  loadMonthlyMinimumOperations,
  MonthlyMinimumOperations,
} from "./loader/monthlyMinimumOperationsLoader";
import { filterInboundFlights } from "./filter";
import { selectOptimalInbound } from "./roundTripPriorityCalculator";
import { filterOutboundFlight } from "./filter";
import { ParsedAirportScheduleData } from "./types";
import { loadAirportScheduleData } from "./loader";
import {
  ResourceTimeGridVariables,
  initializeResourceTimeGridVariables,
  ResourceTimeGrid,
} from "./timeGridUtils";
import { DummyDataPaths } from "../path";
import { loadInternalResourceData } from "./helpers";

// 割り当て済み運航情報
export interface AssignedFlight {
  outbound: FlightData;
  inbound: FlightData | null;
  assignmentTime: Date;
}

// 割り当てエンジンの状態
export interface AssignmentEngineState {
  internalResourceData: any;
  flightCandidateData: LoadedFlightData;
  assignedFlights: AssignedFlight[];
  currentOutboundIndex: number;
  airportScheduleData: ParsedAirportScheduleData; // 空港スケジュールデータ
  resourceTimeGridVariables: ResourceTimeGridVariables; // リソース時間グリッド変数
  monthlyMinimumOperations: MonthlyMinimumOperations; // 月別最小運航基準
}

/**
 * 運航計画割り当てエンジン
 * 往復運航割り当てプロセスを管理するメインクラス
 */
export class FlightAssignmentEngine {
  private state: AssignmentEngineState;
  private dataPaths: DummyDataPaths;

  constructor(dataPaths: DummyDataPaths) {
    this.dataPaths = dataPaths;
    this.state = {
      internalResourceData: {},
      flightCandidateData: {
        outbound: [],
        internationalInbound: {},
        domesticInbound: [],
      },
      assignedFlights: [],
      currentOutboundIndex: 0,
      airportScheduleData: {}, // 空港スケジュールデータ初期化
      resourceTimeGridVariables: {}, // リソース時間グリッド変数初期化
      monthlyMinimumOperations: [], // 月別最小運航基準初期化
    };
  }

  /**
   * 運航データをロードして初期化
   */
  async initialize(): Promise<void> {
    try {
      // 並列で全てのデータロード
      const [
        internalResourceData,
        resourceTimeGridVariables,
        flightCandidateData,
        monthlyMinimumOperations,
        airportScheduleData,
      ] = await Promise.all([
        loadInternalResourceData(this.dataPaths.INTERNAL_RESOURCE_DATA),
        initializeResourceTimeGridVariables(
          this.dataPaths.INTERNAL_RESOURCE_DATA
        ),
        loadAndProcessFlightData(
          this.dataPaths.INTERNATIONAL_DEPARTURE,
          this.dataPaths.INTERNATIONAL_ARRIVAL,
          this.dataPaths.DOMESTIC_ALL
        ),
        loadMonthlyMinimumOperations(
          this.dataPaths.MONTHLY_MINIMUM_OPERATIONS_STANDARD
        ),
        loadAirportScheduleData(this.dataPaths.AIRPORT_SCHEDULE_DATA),
      ]);

      this.state.internalResourceData = internalResourceData;
      this.state.resourceTimeGridVariables = resourceTimeGridVariables;
      this.state.flightCandidateData = flightCandidateData;
      this.state.monthlyMinimumOperations = monthlyMinimumOperations;
      this.state.airportScheduleData = airportScheduleData.parsedData;

      console.log(
        `往路 데이터 로드 완료: ${this.state.flightCandidateData.outbound.length}건`
      );
      console.log(`復路 데이터 로드 완료: ${this.getInboundCount()}건`);
      console.log("공항 스케줄 데이터 로드 완료");
      console.log("자원 시간 그리드 변수 초기화 완료");
      console.log(
        `월별 최소 운항 기준 데이터 로드 완료: ${this.state.monthlyMinimumOperations.length}건`
      );

      this.state.currentOutboundIndex = 0;
      this.state.assignedFlights = [];

      console.log("운항 배정 엔진 초기화 완료");
    } catch (error) {
      console.error("운항 배정 엔진 초기화 실패:", error);
      throw error;
    }
  }

  /**
   * 復路 데이터의 총 개수를 계산
   */
  private getInboundCount(): number {
    let count = 0;

    // International 復路 개수 계산
    Object.values(this.state.flightCandidateData.internationalInbound).forEach(
      (countryData) => {
        Object.values(countryData).forEach((airportData) => {
          count += airportData.length;
        });
      }
    );

    // Domestic 復路 개수 추가
    count += this.state.flightCandidateData.domesticInbound.length;

    return count;
  }

  /**
   * 다음 往路를 배정 시도
   * @returns 배정 성공 여부
   */
  async assignNextOutbound(): Promise<boolean> {
    if (
      this.state.currentOutboundIndex >=
      this.state.flightCandidateData.outbound.length
    ) {
      console.log("모든 往路 배정 완료");
      return false;
    }

    const currentOutbound =
      this.state.flightCandidateData.outbound[this.state.currentOutboundIndex];
    console.log(
      `往路 배정 시도: ${currentOutbound.出発空港} → ${currentOutbound.到着空港} (${currentOutbound.日付})`
    );

    // 체크2, 체크3: 往路에 대한 체크 (체크1은 復路와 함께)
    if (
      !filterOutboundFlight(
        currentOutbound,
        this.state.airportScheduleData,
        this.state.assignedFlights
      )
    ) {
      console.log("往路 체크 실패 - 다음 往路로 진행");
      this.state.currentOutboundIndex++;
      return true; // 다음 往路 시도
    }

    console.log("往路 체크 통과 - 往路 배정 확정");

    // 往路 배정 완료 (아직 배열에 추가하지 않음)
    const assignedFlight: AssignedFlight = {
      outbound: currentOutbound,
      inbound: null,
      assignmentTime: new Date(),
    };

    console.log(
      `往路 배정 완료: ${currentOutbound.出発空港} → ${currentOutbound.到着空港}`
    );

    // 復路 필터링 및 최적 復路 선택
    await this.processInboundAssignment(assignedFlight);

    // 復路가 확정된 경우에만 배열에 추가
    if (assignedFlight.inbound) {
      this.state.assignedFlights.push(assignedFlight);
      console.log("왕복 운항 배정 완료");
    } else {
      console.log("復路 배정 실패 - 往路만 배정됨");
    }

    this.state.currentOutboundIndex++;
    return true;
  }

  /**
   * 復路 배정 처리
   * @param assignedFlight 배정된 往路가 포함된 운항 정보
   */
  private async processInboundAssignment(
    assignedFlight: AssignedFlight
  ): Promise<void> {
    const { outbound } = assignedFlight;

    // 往路의 도착지에서 출발하는 復路 후보들 찾기
    const candidateInbounds = this.findCandidateInbounds(outbound);

    if (candidateInbounds.length === 0) {
      console.log(
        `復路 후보 없음: ${outbound.到着国家} ${outbound.到着空港}에서 출발하는 운항 없음`
      );
      return;
    }

    console.log(`復路 후보 발견: ${candidateInbounds.length}건`);

    // 復路 필터링 (시간 조건, 자원 조건 등)
    const filteredInbounds = filterInboundFlights(
      outbound,
      candidateInbounds,
      this.state.airportScheduleData,
      this.state.assignedFlights,
      this.state.resourceTimeGridVariables,
      this.state.internalResourceData
    );

    if (filteredInbounds.length === 0) {
      console.log("필터링 후 復路 후보 없음");
      return;
    }

    console.log(`필터링 후 復路 후보: ${filteredInbounds.length}건`);

    // 최적의 復路 선택 (왕복 우선순위 지수 기준)
    const optimalInbound = selectOptimalInbound(outbound, filteredInbounds);

    if (optimalInbound) {
      console.log("復路 배정 확정");

      assignedFlight.inbound = optimalInbound;
      console.log(
        `復路 배정 완료: ${optimalInbound.出発空港} → ${optimalInbound.到着空港}`
      );

      // 왕복 운항이 확정된 후 자원 시간 그리드 업데이트
      this.updateResourceTimeGrid(outbound, optimalInbound);
    }
  }

  /**
   * 往路의 도착지에서 출발하는 復路 후보들을 찾기
   * @param outbound 배정된 往路
   * @returns 復路 후보들
   */
  private findCandidateInbounds(outbound: FlightData): FlightData[] {
    const { 到着国家: arrivalCountry, 到着空港: arrivalAirport } = outbound;

    const candidates: FlightData[] = [];

    // 往路가 international인지 domestic인지 판단
    const isInternationalOutbound = outbound.出発国家 !== "日本";

    if (isInternationalOutbound) {
      // International 往路인 경우: international 復路에서 후보 찾기
      if (this.state.flightCandidateData.internationalInbound[arrivalCountry]) {
        if (
          this.state.flightCandidateData.internationalInbound[arrivalCountry][
            arrivalAirport
          ]
        ) {
          candidates.push(
            ...this.state.flightCandidateData.internationalInbound[
              arrivalCountry
            ][arrivalAirport]
          );
        }
      }
    } else {
      // Domestic 往路인 경우: domestic 復路에서 후보 찾기
      const domesticCandidates =
        this.state.flightCandidateData.domesticInbound.filter(
          (domesticFlight) =>
            domesticFlight.出発国家 === arrivalCountry &&
            domesticFlight.出発空港 === arrivalAirport
        );
      candidates.push(...domesticCandidates);
    }

    return candidates;
  }

  /**
   * 현재 배정 상태 조회
   */
  getAssignmentStatus(): AssignmentEngineState {
    return { ...this.state };
  }

  /**
   * 배정된 운항 목록 조회
   */
  getAssignedFlights(): AssignedFlight[] {
    return [...this.state.assignedFlights];
  }

  /**
   * 모든 往路 배정 완료 여부 확인
   */
  isAllOutboundAssigned(): boolean {
    return (
      this.state.currentOutboundIndex >=
      this.state.flightCandidateData.outbound.length
    );
  }

  /**
   * 전체 운항 배정을 수행하는 메인 메서드
   * 1단계: 최소 배정 기준 만족
   * 2단계: 수익 최대화를 위한 남은 배정
   */
  async assignAllFlights(): Promise<void> {
    try {
      console.log("전체 운항 배정 시작...");

      // 1단계: 최소 배정 기준 만족
      await this.assignMinimumOperations();

      // 2단계: 수익 최대화를 위한 남은 배정
      await this.assignRemainingFlights();

      console.log("전체 운항 배정 완료");
    } catch (error) {
      console.error("전체 운항 배정 중 오류:", error);
      throw error;
    }
  }

  /**
   * 월별 최소 운항 기준을 만족시키는 배정
   */
  private async assignMinimumOperations(): Promise<void> {
    try {
      console.log("1단계: 최소 운항 기준 만족 배정 시작...");

      // 각 노선별로 최소 운항 수를 만족할 때까지 순환하며 하나씩 배정
      const nodeCounts = new Map<string, number>(); // 노선별 배정된 수를 추적

      // 초기화: 모든 노선의 배정 수를 0으로 설정
      this.state.monthlyMinimumOperations.forEach((minOperation) => {
        const nodeKey = `${minOperation.出発空港} → ${minOperation.到着空港}`;
        nodeCounts.set(nodeKey, 0);
      });

      let hasMoreAssignments = true;
      let currentIndex = 0;

      while (hasMoreAssignments) {
        hasMoreAssignments = false;

        for (let i = 0; i < this.state.monthlyMinimumOperations.length; i++) {
          const minOperation = this.state.monthlyMinimumOperations[i];
          const nodeKey = `${minOperation.出発空港} → ${minOperation.到着空港}`;
          const currentCount = nodeCounts.get(nodeKey) || 0;
          const targetCount = minOperation.最低維持月別運航回数;

          // 이미 최소 수를 만족한 노선은 건너뛰기
          if (currentCount >= targetCount) {
            continue;
          }

          // 해당 노선의 outbound 찾기
          const matchingOutbounds = this.findMatchingOutbounds(minOperation);

          if (matchingOutbounds.length === 0) {
            console.log(`노선 ${nodeKey}에 해당하는 outbound 없음`);
            continue;
          }

          // 아직 배정되지 않은 outbound 중에서 하나만 배정 시도
          for (const outbound of matchingOutbounds) {
            const isAlreadyAssigned = this.state.assignedFlights.some(
              (flight) => flight.outbound === outbound
            );

            if (!isAlreadyAssigned) {
              // outbound 배정 시도
              const success = await this.assignSpecificOutbound(outbound);
              if (success) {
                const newCount = currentCount + 1;
                nodeCounts.set(nodeKey, newCount);
                console.log(
                  `최소 운항 기준 배정 성공: ${nodeKey} (${newCount}/${targetCount})`
                );
                hasMoreAssignments = true;
                break; // 이 노선에서는 하나만 배정하고 다음 노선으로
              }
            }
          }
        }

        // 모든 노선을 한 번씩 돌았는데도 배정이 없으면 종료
        if (!hasMoreAssignments) {
          break;
        }
      }

      // 최종 결과 출력
      console.log("1단계: 최소 운항 기준 만족 배정 완료");
      nodeCounts.forEach((count, nodeKey) => {
        const minOperation = this.state.monthlyMinimumOperations.find(
          (op) => `${op.出発空港} → ${op.到着空港}` === nodeKey
        );
        if (minOperation) {
          console.log(
            `노선 ${nodeKey}: ${count}/${minOperation.最低維持月別運航回数} 배정 완료`
          );
        }
      });
    } catch (error) {
      console.error("최소 운항 기준 배정 중 오류:", error);
      throw error;
    }
  }

  /**
   * 수익 최대화를 위한 남은 outbound 배정
   */
  private async assignRemainingFlights(): Promise<void> {
    try {
      console.log("2단계: 수익 최대화 배정 시작...");

      // 남은 outbound들을 찾기 (loader에서 이미 優先順位指数 순으로 정렬되어 있음)
      const remainingOutbounds = this.state.flightCandidateData.outbound.filter(
        (outbound) =>
          !this.state.assignedFlights.some(
            (flight) => flight.outbound === outbound
          )
      );

      console.log(`남은 outbound 수: ${remainingOutbounds.length}건`);

      // 남은 outbound들을 순서대로 배정 시도 (이미 정렬되어 있음)
      for (const outbound of remainingOutbounds) {
        const success = await this.assignSpecificOutbound(outbound);
        if (success) {
          console.log(
            `수익 최대화 배정 성공: ${outbound.出発空港} → ${outbound.到着空港} (優先順位指数: ${outbound.優先順位指数})`
          );
        }
      }

      console.log("2단계: 수익 최대화 배정 완료");
    } catch (error) {
      console.error("수익 최대화 배정 중 오류:", error);
      throw error;
    }
  }

  /**
   * 특정 outbound를 배정하는 메서드
   * @param outbound 배정할 outbound
   * @returns 배정 성공 여부
   */
  private async assignSpecificOutbound(outbound: FlightData): Promise<boolean> {
    try {
      // 체크2, 체크3: 往路에 대한 체크
      if (
        !filterOutboundFlight(
          outbound,
          this.state.airportScheduleData,
          this.state.assignedFlights
        )
      ) {
        console.log(
          `往路 체크 실패: ${outbound.出発空港} → ${outbound.到着空港}`
        );
        return false;
      }

      console.log(
        `往路 체크 통과: ${outbound.出発空港} → ${outbound.到着空港}`
      );

      // 往路 배정 완료
      const assignedFlight: AssignedFlight = {
        outbound: outbound,
        inbound: null,
        assignmentTime: new Date(),
      };

      // 復路 필터링 및 최적 復路 선택
      await this.processInboundAssignment(assignedFlight);

      // 復路가 확정된 경우에만 배열에 추가
      if (assignedFlight.inbound) {
        this.state.assignedFlights.push(assignedFlight);
        console.log(
          `왕복 운항 배정 완료: ${outbound.出発空港} → ${outbound.到着空港} → ${assignedFlight.inbound.出発空港} → ${assignedFlight.inbound.到着空港}`
        );
        return true;
      } else {
        console.log(
          `復路 배정 실패: ${outbound.出発空港} → ${outbound.到着空港}`
        );
        return false;
      }
    } catch (error) {
      console.error(
        `특정 outbound 배정 중 오류: ${outbound.出発空港} → ${outbound.到着空港}`,
        error
      );
      return false;
    }
  }

  /**
   * 최소 운항 기준과 일치하는 outbound들을 찾는 메서드
   * @param minOperation 최소 운항 기준
   * @returns 일치하는 outbound 배열
   */
  private findMatchingOutbounds(
    minOperation: MonthlyMinimumOperations[0]
  ): FlightData[] {
    return this.state.flightCandidateData.outbound.filter(
      (outbound) =>
        outbound.出発国家 === minOperation.出発国家 &&
        outbound.出発空港 === minOperation.出発空港 &&
        outbound.到着国家 === minOperation.到着国家 &&
        outbound.到着空港 === minOperation.到着空港
    );
  }

  /**
   * 자원 시간 그리드에서 사용된 자원을 차감하는 함수
   * @param outbound 往路 운항
   * @param inbound 復路 운항
   */
  private updateResourceTimeGrid(
    outbound: FlightData,
    inbound: FlightData
  ): void {
    try {
      // 시간 구간 계산 (checkResourceAvailability와 동일한 로직)
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
      const requiredAircraftScale = outbound.運航規模;

      // 각 자원의 시간 그리드에서 사용된 자원 차감
      this.deductResourceFromTimeGrid(
        this.state.resourceTimeGridVariables.captain_time_grid,
        startTime,
        endTime,
        requiredCaptain
      );

      this.deductResourceFromTimeGrid(
        this.state.resourceTimeGridVariables.second_captain_time_grid,
        startTime,
        endTime,
        requiredSecondCaptain
      );

      this.deductResourceFromTimeGrid(
        this.state.resourceTimeGridVariables.other_workers_index_time_grid,
        startTime,
        endTime,
        requiredOtherWorker
      );

      // 항공기 자원 차감 (운항규모별)
      const aircraftGridKey = `${requiredAircraftScale}_aircraft_time_grid`;
      if (this.state.resourceTimeGridVariables[aircraftGridKey]) {
        this.deductResourceFromTimeGrid(
          this.state.resourceTimeGridVariables[aircraftGridKey],
          startTime,
          endTime,
          1 // 항공기는 1대씩
        );
      }

      console.log(
        `자원 시간 그리드 업데이트 완료: ${outbound.出発空港} → ${outbound.到着空港} → ${inbound.出発空港} → ${inbound.到着空港}`
      );
    } catch (error) {
      console.error("자원 시간 그리드 업데이트 중 오류:", error);
    }
  }

  /**
   * 특정 시간 구간에서 자원을 차감하는 헬퍼 함수
   * @param resourceGrid 해당 자원의 시간 그리드
   * @param startTime 시작 시각
   * @param endTime 종료 시각
   * @param deductAmount 차감할 자원 수량
   */
  private deductResourceFromTimeGrid(
    resourceGrid: ResourceTimeGrid,
    startTime: Date,
    endTime: Date,
    deductAmount: number
  ): void {
    try {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      // 날짜별로 반복
      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dateKey = currentDate.toISOString().split("T")[0];

        if (!resourceGrid[dateKey]) {
          continue;
        }

        // 해당 날짜의 시간대별로 체크하고 차감
        for (const timeSlot of resourceGrid[dateKey]) {
          const [slotHour, slotMinute] = timeSlot.startTime;
          const slotTime = new Date(currentDate);
          slotTime.setHours(slotHour, slotMinute, 0, 0);

          // 해당 시간대가 체크 범위에 포함되는지 확인
          if (slotTime >= startTime && slotTime < endTime) {
            // 자원 차감 (음수가 되지 않도록 보호)
            timeSlot.available = Math.max(0, timeSlot.available - deductAmount);
          }
        }
      }
    } catch (error) {
      console.error("자원 차감 중 오류:", error);
    }
  }
}
