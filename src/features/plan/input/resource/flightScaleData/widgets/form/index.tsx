import { useFormContext } from "react-hook-form";
import useInputModalTypeStore from "../../../../stores/inputModalTypeStore";
import useFlightScaleDataForm from "../../hooks/useFlightScaleDataForm";
import useHandleFormEvent from "../../hooks/useHandleFormEvent";
import InputFormWrapper from "../../../../widgets/inputFormWrapper";
import { FlightScaleDataFormData } from "../../schemas/formSchema";

export default function FlightScaleDataForm() {
  const { inputModalType } = useInputModalTypeStore();

  const { handleSubmit } = useFormContext<FlightScaleDataFormData>();
  const { onValidSubmit, isPending } = useFlightScaleDataForm();

  const { focusErrorField } = useHandleFormEvent();
  const onSubmit = handleSubmit(onValidSubmit, (errors) =>
    focusErrorField(errors)
  );

  return (
    <InputFormWrapper onSubmit={onSubmit} isPending={isPending}>
      <section>hi</section>
    </InputFormWrapper>
  );
}
