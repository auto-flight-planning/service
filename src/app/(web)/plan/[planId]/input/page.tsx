import { SquareButton } from "@/components/button";
import { PointCard } from "@/components/card";
import { InputCategoriesSection } from "@/features/plan/input";

export default function PlanInputPage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <PointCard color="primary" onPointBorder>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            計画導出には以下の3つのデータが必要です。各項目をクリックすると該当ページに移動し、入力データの内容や詳細説明の確認、または入力・編集が可能です
            <br />
            <b className="text-primary-500">
              すべてのデータ入力が完了すると、自動的に算出されます。
            </b>
          </p>
          <div>
            <SquareButton text="全データを一括で依頼" bold />
          </div>
        </div>
      </PointCard>

      <InputCategoriesSection />

      <div className="flex justify-end">
        <SquareButton text="結果を算出" bold size="lg" />
      </div>
    </div>
  );
}
