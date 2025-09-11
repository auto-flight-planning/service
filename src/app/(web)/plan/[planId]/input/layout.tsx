// import Breadcrumb from "./_components/breadcrumb";

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
    <div>
      {/* <Breadcrumb planId={planId} /> */}
      {children}
    </div>
  );
}
