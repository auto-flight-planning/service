import { InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface SecretTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
}

export default function SecretTextField({
  label,
  placeholder,
  error,
  ...props
}: SecretTextFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <label className="block text-md font-[550] text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
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
      {error && <p className="mt-1 text-xs text-right text-red">{error}</p>}
    </div>
  );
}
