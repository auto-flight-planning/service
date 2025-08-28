import { InputHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function TextField({
  name,
  label,
  placeholder,
  ...props
}: TextFieldProps) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FieldWrapper label={label} error={error?.message} htmlFor={props.id}>
      <input
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs ${
          error
            ? "border-red focus:border-red focus:ring-red focus:ring-opacity-25"
            : "border-gray-300 focus:border-primary-500"
        }`}
        placeholder={placeholder}
        {...props}
      />
    </FieldWrapper>
  );
}
