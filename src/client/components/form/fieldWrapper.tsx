import { ReactNode } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export default function FieldWrapper({
  label,
  error,
  children,
  htmlFor,
}: FieldWrapperProps) {
  return (
    <div className={`w-full ${error ? "animate-shake" : ""}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-md font-[550] text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-right text-red">{error}</p>}
    </div>
  );
}
