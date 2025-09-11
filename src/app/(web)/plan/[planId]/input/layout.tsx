import { BreadcrumbSection } from "@/features/plan/input";

export default async function InputLayout({
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
    <div className="flex flex-col gap-4 w-full h-full">
      <BreadcrumbSection planId={planId} />
      {children}
    </div>
  );
}
