import { parse } from "csv-parse/sync";
import { getGeneralClient } from "@/supabase/generalClient";

type CSVRow = Record<string, string>;

export default async function loadCSV(
  bucketName: string,
  url: string
): Promise<CSVRow[]> {
  try {
    const supabase = await getGeneralClient();

    const { data } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(url, 3600);

    if (!data) {
      throw new Error(`CSVファイルが見つかりません: ${bucketName}、${url}`);
    }

    const res = await fetch(data.signedUrl);
    const text = await res.text();

    return parse(text, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    throw new Error(
      `CSVファイルロードに失敗しました: ${bucketName}、${url}、${error}`
    );
  }
}
