import { useState } from "react";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";
import { FlightScaleDataFormData } from "../schemas/formSchema";
import { DEFAULT_FLIGHT_SCALE_DATA } from "../constant";

export default function useHandleForm() {
  const useCurrentIndexState = useState(0);
  const [currentIndex, setCurrentIndex] = useCurrentIndexState;

  const { control, setFocus } = useFormContext<FlightScaleDataFormData>();
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

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev === index) return 0;
        if (prev > index) return prev - 1;
        return prev;
      });
    }, 0);
  };

  const focusErrorField = (errors: FieldErrors<FlightScaleDataFormData>) => {
    const arrayErrors = errors.flightScaleDataValues as FieldErrors<
      FlightScaleDataFormData["flightScaleDataValues"]
    >;
    if (!arrayErrors) return;

    for (let i = 0; i < arrayErrors.length; i++) {
      const errorItem = arrayErrors[i];
      if (errorItem && typeof errorItem === "object") {
        setCurrentIndex(i);
        const errorFieldName = Object.keys(
          errorItem
        )[0] as keyof FlightScaleDataFormData["flightScaleDataValues"][number];
        setFocus(`flightScaleDataValues.${i}.${errorFieldName}`);
        return;
      }
    }
  };

  return {
    useCurrentIndexState,
    fields,
    addItem,
    removeItem,
    focusErrorField,
  };
}
