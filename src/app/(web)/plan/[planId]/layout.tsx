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
      <AccessWrapper planId={planId}>
        <HeaderWrapper planId={planId}>{children}</HeaderWrapper>
      </AccessWrapper>
    </div>
  );
}
