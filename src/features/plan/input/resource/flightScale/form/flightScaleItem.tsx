import { useController, useFormContext } from "react-hook-form";

interface FlightScaleItemProps {
  index: number;
  canRemove: boolean;
  value: string | undefined;
  type: string;
  onRemove: () => void;
  onUpdate: (value: string) => void;
}

export default function FlightScaleItem({
  index,
  canRemove,
  type,
  value,
  onRemove,
  onUpdate,
}: FlightScaleItemProps) {
  const { control } = useFormContext();

  const {
    fieldState: { error },
  } = useController({
    name: `flight_scale_type.${index}.value`,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onUpdate(newValue);
  };

  const handleRemove = () => {
    console.log("🗑️ Removing index:", index);
    // 부모 컴포넌트의 remove 함수 사용
    onRemove();
  };

  console.log(`Item ${index} - value: "${value}", onChange triggered`);

  return (
    <div className="relative flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* 삭제 버튼 - 우상단 */}
      {type === "edit" && canRemove && (
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white hover:bg-red-50 border border-gray-300 hover:border-red-300 text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md group hover:cursor-pointer active:scale-95 active:bg-red-100"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* 번호 */}
      <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {index + 1}
      </div>

      {/* 입력 필드 */}
      <div className="flex-1">
        <input
          value={value || ""}
          onChange={handleChange}
          placeholder="運航規模を入力してください（例：大規模運航）"
          disabled={type === "view"}
          className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-25"
              : "border-gray-300 focus:border-primary-500"
          }`}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1 text-right w-full pr-1">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
