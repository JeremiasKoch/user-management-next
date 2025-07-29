'use client';

import { ChangeEvent } from 'react';

type GenericFilterProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
};

export const GenericFilter = ({
  label,
  value,
  onChange,
  options,
}: GenericFilterProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(e.target.value);

  return (
    <div>
      {options && options.length > 0 ? (
        <select
          value={value}
          onChange={handleChange}
          className="border px-3 py-1 rounded"
        >
          <option value="" disabled hidden>
            Filter by {label}
          </option>

          <option value="">Default (all)</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder={`Filter by ${label}`}
          value={value}
          onChange={handleChange}
          className="border px-3 py-1 rounded"
        />
      )}
    </div>
  );
};
