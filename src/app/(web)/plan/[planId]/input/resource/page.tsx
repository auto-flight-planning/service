import { InputHeader } from "@/features/plan/input";
import { ResourceInputContainer } from "@/features/plan/input/resource";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{
    planId: string;
  }>;
}) {
  const { planId } = await params;
  return (
    <div className="flex flex-col gap-8">
      <InputHeader
        title="自社資源データ"
        description="運航本部総括部・財務部へデータを依頼"
      />
      <ResourceInputContainer planId={planId} />
    </div>
  );
}
