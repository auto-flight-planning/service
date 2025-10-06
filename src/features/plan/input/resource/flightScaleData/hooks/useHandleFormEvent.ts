import { useState } from "react";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";
import { FlightScaleDataFormData } from "../schemas/formSchema";
import { DEFAULT_FLIGHT_SCALE_DATA } from "../constant";

export default function useHandleFormEvent() {
  const useCurrentIndexState = useState(0);
  const [currentIndex, setCurrentIndex] = useCurrentIndexState;

  const { control } = useFormContext<FlightScaleDataFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "flightScaleDataValues",
  });

  const addItem = () => {
    const newIndex = fields.length;
    append(DEFAULT_FLIGHT_SCALE_DATA);
    setCurrentIndex(newIndex);
  };

  // TODO: 잘 작동할 지 모르겠음
  // 残りが1つの要素の場合は、削除（X）ボタンを無効化
  const removeItem = (index: number) => {
    remove(index);

    if (currentIndex === index) setCurrentIndex(0); // 残っている中で最初の項目にフォーカス
    if (currentIndex > index) setCurrentIndex(currentIndex - 1); // 要素数が減ったため、現在のインデックスを1つ減らす
    // currentIndex < index の場合は影響なし
  };

  const focusErrorIndex = (errors: FieldErrors<FlightScaleDataFormData>) => {
    const arrayErrors = errors.flightScaleDataValues!;
    for (let i = 0; i < arrayErrors.length!; i++) {
      if (arrayErrors[i] && typeof arrayErrors[i] === "object") {
        setCurrentIndex(i);
        return;
      }
    }
  };

  return {
    useCurrentIndexState,
    addItem,
    removeItem,
    focusErrorIndex,
  };
}
