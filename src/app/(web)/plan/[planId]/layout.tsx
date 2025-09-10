import { AccessWrapper, HeaderWrapper } from "@/features/plan/base/view";

export default async function PlanLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    planId: string;
  }>;
}) {
  const { planId } = await params;
  return (
    <div className="flex flex-col gap-12 w-[90%] max-w-[1200px] h-[90%]">
      <AccessWrapper>
        <HeaderWrapper planId={planId}>
          <div className="h-[30rem] bg-gray-100 rounded-2xl p-8">content</div>
        </HeaderWrapper>
      </AccessWrapper>
    </div>
  );
}
