import React from "react";
import Image from "next/image";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  className = "",
  disabled = false,
}: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-[22.60px] h-[22.60px] flex-shrink-0 transition-all duration-300 ease-in-out ${
          checked ? "scale-110" : "scale-100"
        } hover:scale-105`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/checked.svg"
            alt="Checked"
            width={22.60}
            height={22.60}
            className="transition-transform duration-300"
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            checked ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/unChecked.svg"
            alt="Unchecked"
            width={22.60}
            height={22.60}
            className="transition-transform duration-300"
          />
        </div>
      </div>
      {label && (
        <span className="select-none transition-colors duration-200">
          {label}
        </span>
      )}
    </label>
  );
}