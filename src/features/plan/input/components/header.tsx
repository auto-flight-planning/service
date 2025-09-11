export default function InputHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-gray-700">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
