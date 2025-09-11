import { SquareButton } from "@/components/button";
import { PointCard } from "@/components/card";
import { DataCategoriesSection } from "@/features/plan/input";

export default async function PlanInputPage({
  params,
}: {
  params: Promise<{
    planId: string;
  }>;
}) {
  const { planId } = await params;

  return (
    <div className="flex flex-col gap-8 pb-16">
      <PointCard color="primary" onPointBorder>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            企画導出には以下の3つのデータが必要です。各項目をクリックすると該当ページに遷移し、詳細説明・入力データの確認・直接入力が可能です。
            <br />
            <b className="text-primary-500">
              すべてのデータ入力が完了しましたら、結果算出ボタンを押してください。
            </b>
          </p>
          <div>
            <SquareButton text="全データ一括依頼" bold />
          </div>
        </div>
      </PointCard>

      <DataCategoriesSection planId={planId} />

      <div className="flex justify-end">
        <SquareButton text="結果算出" bold size="large" />
      </div>
    </div>
  );
}
