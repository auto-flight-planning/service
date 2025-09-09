import { HeaderWrapper } from "@/features/plan/base/header";

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
    <div className="py-8 px-[12rem] w-full h-full flex flex-col gap-12">
      <HeaderWrapper planId={planId}>
        <div className="h-[30rem] bg-gray-100 rounded-2xl p-8">content</div>
      </HeaderWrapper>
      {/* <div>{children}</div> */}
    </div>
  );
}
