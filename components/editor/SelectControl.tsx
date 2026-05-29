"use client";

import { useState } from "react";

interface SelectControlProps {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export function SelectControl({
  label,
  value: initialValue,
  options,
  onChange,
}: SelectControlProps) {
  const [value, setValue] = useState(initialValue ?? options[0]?.value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-text-secondary">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="
            w-full appearance-none rounded-[8px] border border-border bg-bg-card px-2.5 py-1.5
            pr-8 text-sm text-text-primary outline-none transition-colors
            hover:border-border-hover focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
          "
          aria-label={label}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
