import { BreadcrumbSection } from "@/features/plan/input";

export default function InputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <BreadcrumbSection />
      {children}
    </div>
  );
}
