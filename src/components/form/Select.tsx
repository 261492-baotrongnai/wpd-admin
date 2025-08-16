import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg"; // Optional size prop
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  error = false,
  size = "md", // Default size
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  let statusClass = "";
  if (error) {
    statusClass +=
      " border-error-500 focus:ring-error-500/10 focus:border-error-500";
  } else {
    statusClass +=
      " border-gray-300 focus:ring-brand-500/10 focus:border-brand-300";
  }

  return (
    <select
      className={`${
        size === "sm"
          ? "h-9 text-sm"
          : size === "lg"
          ? "h-12 text-lg"
          : "h-11 text-md"
      } w-full  appearance-none rounded-lg border ${statusClass} px-4 py-2.5 pr-11 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
