import { useRouter } from "next/navigation";
import { IconButton } from "@/components/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb({
  planId,
  planTitle,
  dataName,
}: {
  planId: string;
  planTitle: string;
  dataName: string;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6 text-md">
      <IconButton
        IconComponent={ChevronLeftIcon}
        onClick={() => router.push(`/plan/${planId}/input`)}
      />
      <span className="text-primary-500 font-medium">{planTitle}</span>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">入力段階</span>
      <span className="text-gray-400">/</span>
      <span className="text-gray-800 font-medium">{dataName}</span>
    </div>
  );
}
