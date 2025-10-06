"use client";

import useGetFlightScaleData from "../hooks/useGetFlightScaleData";
import useFlightScaleDataForm from "../hooks/useFlightScaleDataForm";
import FlightScaleDataForm from "./form";
import FlightScaleDataExplain from "./explain";
import InputModal from "../../../widgets/inputModal";

export default function FlightScaleDataInputModal() {
  const { flightScaleData } = useGetFlightScaleData();
  const { formMethods } = useFlightScaleDataForm();

  return (
    <InputModal
      title="運航規模別データ"
      number={2}
      fetchData={flightScaleData}
      formMethods={formMethods}
      FormTabComponent={FlightScaleDataForm}
      ExplainTabComponent={FlightScaleDataExplain}
    />
  );
}
