"use client";

import InputModal from "../../../widgets/inputModal";
import useGetWorkforce from "../hooks/useGetWorkforce";
import useWorkforceForm from "../hooks/useWorkforceForm";
import WorkforceForm from "./form";
import WorkforceExplain from "./explain";

export default function WorkforceInputModal() {
  const { workforceData } = useGetWorkforce();
  const { formMethods } = useWorkforceForm();

  return (
    <InputModal
      title="総人員データ"
      number={1}
      fetchData={workforceData}
      formMethods={formMethods}
      FormTabComponent={WorkforceForm}
      ExplainTabComponent={WorkforceExplain}
    />
  );
}
