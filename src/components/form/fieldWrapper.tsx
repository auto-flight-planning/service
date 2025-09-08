import { ReactNode } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
  onErrorMsg?: boolean;
}

export default function FieldWrapper({
  label,
  error,
  children,
  htmlFor,
  onErrorMsg = true,
}: FieldWrapperProps) {
  return (
    <div className={`w-full ${error ? "animate-shake" : ""}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-[550] text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      {children}
      {error && onErrorMsg && (
        <p className="mt-1 text-xs text-right text-red-500">{error}</p>
      )}
    </div>
  );
}
