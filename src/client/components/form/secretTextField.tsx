import { InputHTMLAttributes, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import FieldWrapper from "./fieldWrapper";

interface SecretTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function SecretTextField({
  name,
  label,
  placeholder,
  ...props
}: SecretTextFieldProps) {
  const { control } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <FieldWrapper label={label} error={error?.message} htmlFor={props.id}>
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          className={`w-full px-3 py-2.5 pr-12 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs ${
            error
              ? "border-red focus:border-red focus:ring-red focus:ring-opacity-25"
              : "border-gray-300 focus:border-primary-500"
          }`}
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
        >
          {isVisible ? (
            <EyeSlashIcon className="w-4 h-4" />
          ) : (
            <EyeIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </FieldWrapper>
  );
}
