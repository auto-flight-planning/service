import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema, type CreatePlanFormDataType } from "./schema";
import { getMonthOptions, getStartMonth } from "./utils";

export default function useCreatePlan() {
  const formMethods = useForm<CreatePlanFormDataType>({
    mode: "onChange",
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      planName: "",
      year: "",
      month: "",
      participants: [],
    },
  });
  const { control, setValue } = formMethods;

  const watchYear = useWatch({ control, name: "year" });
  const watchMonth = useWatch({ control, name: "month" });

  const onYearChange = (year: string) => {
    setValue("year", year);
    if (!watchMonth) return;
    if (Number(watchMonth) < getStartMonth(year)) {
      setValue("month", "");
    }
  };

  return {
    formMethods,
    dateProps: {
      monthOptions: getMonthOptions(watchYear),
      onYearChange,
    },
  };
}
