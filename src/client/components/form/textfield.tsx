import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
}

export default function TextField({
  label,
  placeholder,
  error,
  ...props
}: TextFieldProps) {
  return (
    <div>
      <label className="block text-md font-[550] text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2.5 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25 placeholder:text-gray-400 placeholder:text-xs ${
          error
            ? "border-red focus:border-red focus:ring-red focus:ring-opacity-25"
            : "border-gray-300 focus:border-primary-500"
        }`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-right text-red">{error}</p>}
    </div>
  );
}
