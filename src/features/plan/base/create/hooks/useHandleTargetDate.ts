import { useFormContext, useWatch } from "react-hook-form";
import { getMonthOptions, getStartMonth } from "../utils";

export default function useHandleTargetDate() {
  const { control, setValue } = useFormContext();

  const watchYear = useWatch({ control, name: "year" });
  const watchMonth = useWatch({ control, name: "month" });

  const monthOptions = getMonthOptions(watchYear);

  const onYearChange = (year: string) => {
    setValue("year", year);
    if (!watchMonth) return;
    if (Number(watchMonth) < getStartMonth(year)) {
      setValue("month", "");
    }
  };

  return {
    monthOptions,
    onYearChange,
  };
}
