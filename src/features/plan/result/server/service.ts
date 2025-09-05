import { loadCSV } from "@/server/lib/loader";

export class PlanResultService {
  async createPlanResult(planId: string) {
    // 1. input status の確認 (入力済みだと仮定する)
    // 2. input data の取得 (ダミーデータを使用する)
    // 3. 結果算出
    const temp = await loadCSV(
      "candidate_flights",
      "domestic/41962055-679d-451c-9158-7c36e8d275c1/domestic.csv"
    );
    console.log(temp);
  }
}

// https://ysjpcqpcxtvaddfagtqw.supabase.co/storage/v1/object/sign/candidate_flights/domestic/41962055-679d-451c-9158-7c36e8d275c1/domestic.csv?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hY2M4YjU1OS01NWYxLTQzNWEtYjUxOS0zNTliMzgwNmFmMzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYW5kaWRhdGVfZmxpZ2h0cy9kb21lc3RpYy80MTk2MjA1NS02NzlkLTQ1MWMtOTE1OC03YzM2ZThkMjc1YzEvZG9tZXN0aWMuY3N2IiwiaWF0IjoxNzU3MDkyNzUyLCJleHAiOjE3NTc2OTc1NTJ9.cffmqMLqIGVGaysJ34v0i-AFFvPd9iKWl8Xx42xnydQ
