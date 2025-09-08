import { InputHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  name: string;
  label?: string;
  placeholder?: string;
  unit?: string;
  onUnit?: boolean;
}

export default function NumberField({
  name,
  label,
  placeholder,
  unit,
  onUnit = false,
  ...props
}: NumberFieldProps) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 빈 문자열이면 null로 설정
    if (inputValue === "") {
      onChange(null);
      return;
    }

    // 숫자로 변환
    const numberValue = Number(inputValue);

    // 유효한 숫자이면 number로, 아니면 원본 string으로 전달 (validation에서 처리)
    onChange(isNaN(numberValue) ? inputValue : numberValue);
  };

  return (
    <FieldWrapper label={label} error={error?.message} htmlFor={props.id}>
      {onUnit && unit ? (
        <div className="relative">
          <input
            type="number"
            value={value ?? ""}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 pr-12 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200 ${
              error
                ? "border-red-400 focus:border-red-400 focus:ring-red-400 focus:ring-opacity-25"
                : "border-gray-300 focus:border-primary-500"
            }`}
            placeholder={placeholder}
            {...props}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
            {unit}
          </span>
        </div>
      ) : (
        <input
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400 focus:ring-opacity-25"
              : "border-gray-300 focus:border-primary-500"
          }`}
          placeholder={placeholder}
          {...props}
        />
      )}
    </FieldWrapper>
  );
}
