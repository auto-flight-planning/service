"use client";

import { SelectHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";
import FieldWrapper from "./fieldWrapper";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  name: string;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  onCustomChange?: (value: string) => void;
}

export default function Select({
  name,
  options,
  label,
  placeholder,
  className = "",
  onCustomChange,
  ...props
}: SelectProps) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue); // react-hook-form update
    if (onCustomChange) {
      onCustomChange(newValue); // custom logic
    }
  };

  return (
    <FieldWrapper label={label} error={error?.message} htmlFor={props.id}>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          {...props}
          className={`
            w-full
            px-3
            py-2.5
            min-h-11
            border
            rounded-md
            text-sm
            transition-colors
            duration-200
            focus:outline-none
            focus:ring-1
            focus:ring-primary-500
            focus:ring-opacity-25
            appearance-none
            cursor-pointer
            bg-white
            ${
              !value || value === "" ? "text-gray-400 text-xs" : "text-gray-900"
            }
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:cursor-not-allowed
            disabled:border-gray-200
            ${
              error
                ? "border-red focus:border-red focus:ring-red focus:ring-opacity-25"
                : "border-gray-300 focus:border-primary-500"
            }
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Arrow Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${
              props.disabled ? "text-gray-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </FieldWrapper>
  );
}
