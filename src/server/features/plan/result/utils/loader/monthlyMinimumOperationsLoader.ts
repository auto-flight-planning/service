import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// 月別最小運航基準データインターフェース
export interface MonthlyMinimumOperation {
  出発国家: string;
  出発空港: string;
  到着国家: string;
  到着空港: string;
  最低維持月別運航回数: number;
}

// 路線別最小運航基準を保存するタイプ
export type MonthlyMinimumOperations = MonthlyMinimumOperation[];

/**
 * CSVファイルをロードしてパースする関数
 * @param filePath CSVファイルパス
 * @returns パースされたデータ配列
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

    // データタイプ変換（文字列を数字に）
    return records.map((record: any) => ({
      ...record,
      最低維持月別運航回数: Number(record.最低維持月別運航回数),
    }));
  } catch (error) {
    console.error(`CSVファイルロード失敗（${filePath}）:`, error);
    throw new Error(`CSVファイルロードに失敗しました: ${filePath}`);
  }
}

/**
 * 月別最小運航基準データをロードする関数
 * @param filePath monthly_minimum_operations_standard.csvファイルパス
 * @returns ロードされた月別最小運航基準データ
 */
export async function loadMonthlyMinimumOperations(
  filePath: string
): Promise<MonthlyMinimumOperations> {
  try {
    console.log("月別最小運航基準データロード開始...");

    const data = await loadCSVData(filePath);

    console.log(`月別最小運航基準データロード完了: ${data.length}件`);

    return data;
  } catch (error) {
    console.error("月別最小運航基準データロード失敗:", error);
    throw error;
  }
}
