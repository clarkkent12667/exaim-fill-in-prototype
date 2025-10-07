import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  helperText?: string;
}

export function Select({ label, value, onChange, options, helperText }: SelectProps) {
  const selectId = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="space-y-1">
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
