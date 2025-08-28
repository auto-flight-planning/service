import InputHeader from "../_components/inputHeader";
import ResourceInputContent from "./_components/resourceInputContent";

interface ResourcePageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { planId } = await params;

  return (
    <div className="flex flex-col gap-8">
      <InputHeader
        title="自社資源データ"
        description="運航本部総括部・財務部にデータを依頼"
      />
      <ResourceInputContent planId={planId} />
    </div>
  );
}
