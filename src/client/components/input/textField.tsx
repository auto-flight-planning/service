"use client";

import { InputHTMLAttributes, useState } from "react";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <div>
      {label && (
        <label className="block text-md font-[550] text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs ${"border-gray-300 focus:border-primary-500"} ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
