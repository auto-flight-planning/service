import { loadCSV } from "@/server/lib/loader";
import { loadJSAndGetFunc } from "@/server/lib/loader/loadJS";

export class PlanResultService {
  async createPlanResult(planId: string) {
    // 1. input status の確認 (入力済みだと仮定する)
    // 2. input data の取得 (ダミーデータを使用する)
    // 3. 結果算出
    const temp1 = await loadCSV(
      "candidate_flights",
      "domestic/41962055-679d-451c-9158-7c36e8d275c1/domestic.csv"
    );
    const temp2 = await loadJSAndGetFunc(
      "round_trip_normalization", // TODO: -> normalizer
      "41962055-679d-451c-9158-7c36e8d275c1/round_trip_priority_normalizer.ts"
    );
    console.log(temp2);
  }
}
