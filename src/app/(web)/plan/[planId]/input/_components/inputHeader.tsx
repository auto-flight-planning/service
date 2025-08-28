export default function InputHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
