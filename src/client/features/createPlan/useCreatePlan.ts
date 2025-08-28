import { useRouter } from "next/navigation";
import { useModalStore, useToastStore } from "@/client/stores";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema, type CreatePlanFormDataType } from "./schema";
import { getMonthOptions, getStartMonth } from "./utils";
import { useMutation } from "@tanstack/react-query";

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

  const { addToast } = useToastStore();
  const router = useRouter();
  const { closeModal } = useModalStore();

  // const { mutate: createPlan } = useMutation({
  //   mutationFn: createPlanAPI,
  //   onSuccess: () => {
  //     addToast({
  //       type: "success",
  //       message: "企画を作成しました。",
  //       title: "企画作成成功",
  //     });
  //     // router.push("/home");
  //     closeModal();
  //   },
  //   onError: (error) => {
  //     addToast({
  //       type: "error",
  //       message: error.message || "企画作成に失敗しました。",
  //       title: "企画作成失敗",
  //     });
  //   },
  // });

  const onValidSubmit = (data: CreatePlanFormDataType) => {
    // createPlan(data);
  };

  return {
    formMethods,
    onValidSubmit,
    dateProps: {
      monthOptions: getMonthOptions(watchYear),
      onYearChange,
    },
  };
}
