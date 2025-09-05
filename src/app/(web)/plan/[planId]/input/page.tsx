import { SquareButton } from "@/components/button";
import { PointCard } from "@/components/card";
import DataCategoriesSection from "./_components/dataCategoriesSection";
import SubmitButton from "./_components/submitButton";

interface PlanInputPageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default async function PlanInputPage({ params }: PlanInputPageProps) {
  const { planId } = await params;

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* 안내 섹션 */}
      <PointCard color="primary" onPointBorder>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            企画導出のため以下の3つのデータが必要です。クリックで該当ページに移動してデータを個別要請でき、詳細説明、入力結果確認、直接入力が可能です。
            <br />
            <b className="text-primary-500">
              すべてのデータ入力が完了すると、自動的に企画導出が開始されます。
            </b>
          </p>
          <div>
            <SquareButton text="全データ一括依頼" bold />
          </div>
        </div>
      </PointCard>

      {/* 데이터 카테고리 섹션 */}
      <DataCategoriesSection planId={planId} />
      <SubmitButton planId={planId} />
    </div>
  );
}
