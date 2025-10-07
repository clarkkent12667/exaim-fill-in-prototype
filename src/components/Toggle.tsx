import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
}

export function Toggle({ label, checked, onChange, helperText }: ToggleProps) {
  const toggleId = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="space-y-1">
      <label htmlFor={toggleId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          id={toggleId}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm text-gray-600">
          {checked ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
