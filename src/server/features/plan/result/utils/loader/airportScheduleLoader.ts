import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import {
  AirportScheduleRow,
  ParsedAirportScheduleData,
  AirportScheduleData,
} from "../types";

/**
 * 공항 스케줄 데이터를 로드하고 파싱하는 함수
 * @param airportScheduleDataPath airport_schedule_data.csv 파일 경로
 * @returns 파싱된 공항 스케줄 데이터
 */
export async function loadAirportScheduleData(
  airportScheduleDataPath: string
): Promise<AirportScheduleData> {
  try {
    // CSV 파일 경로
    const csvPath = path.join(process.cwd(), airportScheduleDataPath);

    // CSV 파일 읽기 (비동기)
    const csvContent = await fs.promises.readFile(csvPath, "utf-8");

    // CSV 파싱
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    }) as AirportScheduleRow[];

    console.log(`공항 스케줄 데이터 로드 완료: ${records.length}건`);

    // 파싱된 데이터 생성
    const parsedData: ParsedAirportScheduleData = {};

    records.forEach((record) => {
      const {
        国,
        空港,
        日付,
        "割り当て可能時間帯（割り当て可能回数）": timeSlotsJson,
      } = record;

      try {
        // JSON 문자열을 파싱
        const timeSlots = JSON.parse(timeSlotsJson);

        // 키 생성: "국가_공항명_날짜" 형태
        const scheduleKey = `${国}_${空港}_${日付}`;

        parsedData[scheduleKey] = timeSlots;
      } catch (jsonError) {
        console.error(`JSON 파싱 오류 (${国} ${空港} ${日付}):`, jsonError);
        // JSON 파싱 실패 시 빈 배열로 설정
        const scheduleKey = `${国}_${空港}_${日付}`;
        parsedData[scheduleKey] = [];
      }
    });

    console.log(
      `공항 스케줄 데이터 파싱 완료: ${Object.keys(parsedData).length}개 키`
    );

    return {
      rawData: records,
      parsedData: parsedData,
    };
  } catch (error) {
    console.error("공항 스케줄 데이터 로드 중 오류:", error);

    // 오류 발생 시 빈 데이터 반환
    return {
      rawData: [],
      parsedData: {},
    };
  }
}

/**
 * 특정 공항・날짜의 스케줄 데이터 조회
 * @param country 국가
 * @param airport 공항명
 * @param date 날짜
 * @param parsedData 파싱된 공항 스케줄 데이터
 * @returns 해당 공항・날짜의 시간대별 배정 가능 횟수 배열
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
