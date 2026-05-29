"use client";

import { useState } from "react";

interface ToggleControlProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ToggleControl({ label, defaultChecked = false, onChange }: ToggleControlProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-xs font-medium text-text-secondary">{label}</label>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={handleToggle}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ${
          checked ? "bg-amber-500" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
