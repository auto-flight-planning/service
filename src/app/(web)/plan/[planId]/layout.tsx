import PlanHeader from "./_components/planHeader";

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
    <div className="py-8 px-36 w-full h-full flex flex-col gap-8">
      {/* <PlanHeader planId={planId} /> */}
      {/* <div>{children}</div> */}
    </div>
  );
}
