import { InputModalProps } from "../../../types";
import useFlightScaleResource from "../useFlightScaleResource";
import FlightScaleItem from "./flightScaleItem";
import AddScaleButton from "./addScaleButton";
import { useFieldArray } from "react-hook-form";

export default function FlightScaleForm({
  planId = "",
  type = "edit",
}: InputModalProps) {
  const { formMethods } = useFlightScaleResource(planId);
  const { handleSubmit, control } = formMethods;

  const { fields: flightScaleType, replace } = useFieldArray({
    control,
    name: "flight_scale_types",
  });

  // 전체 배열을 바꾸는 함수들
  const addScale = () => {
    const newArray = [...flightScaleType, { value: "" }];
    replace(newArray);
  };

  const removeScale = (index: number) => {
    if (flightScaleType.length > 1) {
      const newArray = flightScaleType.filter((_, i) => i !== index);
      replace(newArray);
    }
  };

  const updateScale = (index: number, value: string) => {
    const newArray = [...flightScaleType];
    newArray[index] = { ...newArray[index], value };
    replace(newArray);
  };

  return (
    <div className="h-full">
      <form
        className="flex flex-col gap-6 h-full"
        onSubmit={handleSubmit(() => {})}
      >
        {/* 운항규모의 종류 섹션 */}
        {flightScaleType.every((scaleType) => scaleType.value === "") &&
        type === "view" ? (
          <div className="text-gray-500 w-full flex justify-center items-center h-full">
            まだ入力されていません
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-700">運航規模の種類</h3>
            </div>

            {/* 동적 입력 필드들 */}
            <div className="space-y-3">
              {flightScaleType.map((scaleType, index) => (
                <FlightScaleItem
                  key={index}
                  index={index}
                  value={scaleType.value}
                  canRemove={flightScaleType.length > 1}
                  type={type}
                  onRemove={() => removeScale(index)}
                  onUpdate={(value) => updateScale(index, value)}
                />
              ))}
            </div>

            {/* 추가 버튼 */}
            {type === "edit" && <AddScaleButton onAdd={addScale} />}
          </div>
        )}
      </form>
    </div>
  );
}
