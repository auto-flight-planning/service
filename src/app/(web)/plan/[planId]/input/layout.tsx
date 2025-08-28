import Breadcrumb from "./_components/breadcrumb";

interface InputLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    planId: string;
  }>;
}

export default async function InputLayout({
  children,
  params,
}: InputLayoutProps) {
  const { planId } = await params;

  return (
    <div>
      <Breadcrumb planId={planId} />
      {children}
    </div>
  );
}
