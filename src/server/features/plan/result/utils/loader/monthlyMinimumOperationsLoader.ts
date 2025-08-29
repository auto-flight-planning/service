import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// 월별 최소 운항 기준 데이터 인터페이스
export interface MonthlyMinimumOperation {
  出発国家: string;
  出発空港: string;
  到着国家: string;
  到着空港: string;
  最低維持月別運航回数: number;
}

// 노선별 최소 운항 기준을 저장할 타입
export type MonthlyMinimumOperations = MonthlyMinimumOperation[];

/**
 * CSV 파일을 로드하고 파싱하는 함수
 * @param filePath CSV 파일 경로
 * @returns 파싱된 데이터 배열
 */
async function loadCSVData(
  filePath: string
): Promise<MonthlyMinimumOperation[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // 데이터 타입 변환 (문자열을 숫자로)
    return records.map((record: any) => ({
      ...record,
      最低維持月別運航回数: Number(record.最低維持月別運航回数),
    }));
  } catch (error) {
    console.error(`CSV 파일 로드 실패 (${filePath}):`, error);
    throw new Error(`CSV 파일 로드를 실패했습니다: ${filePath}`);
  }
}

/**
 * 월별 최소 운항 기준 데이터를 로드하는 함수
 * @param filePath monthly_minimum_operations_standard.csv 파일 경로
 * @returns 로드된 월별 최소 운항 기준 데이터
 */
export async function loadMonthlyMinimumOperations(
  filePath: string
): Promise<MonthlyMinimumOperations> {
  try {
    console.log("월별 최소 운항 기준 데이터 로드 시작...");

    const data = await loadCSVData(filePath);

    console.log(`월별 최소 운항 기준 데이터 로드 완료: ${data.length}건`);

    return data;
  } catch (error) {
    console.error("월별 최소 운항 기준 데이터 로드 실패:", error);
    throw error;
  }
}
