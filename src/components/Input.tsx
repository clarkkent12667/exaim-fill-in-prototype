interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  helperText, 
  multiline = false,
  rows = 3
}: InputProps) {
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`input-field resize-none ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`input-field ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        />
      )}
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
