"use client";

import { useState } from "react";

interface ColorPickerControlProps {
  label: string;
  value?: string;
  onChange?: (color: string) => void;
}

const SWATCHES = [
  "#D4A574", "#C68642", "#8B5E3C", "#5C3A21", "#3D2314",
  "#F5D6C6", "#E8B89D", "#C69C7A", "#A67C52", "#7A5A3A",
  "#1A1A2E", "#16213E", "#0F3460", "#533483", "#E94560",
  "#2D4059", "#EA5455", "#F07B3F", "#FFD460", "#A3DE83",
  "#4A6FA5", "#6C8EBF", "#88B0D9", "#2ECC71", "#27AE60",
];

export function ColorPickerControl({
  label,
  value: initialValue = "#D4A574",
  onChange,
}: ColorPickerControlProps) {
  const [value, setValue] = useState(initialValue);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color: string) => {
    setValue(color);
    onChange?.(color);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-text-secondary">{label}</label>

      {/* Color swatch row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPicker((o) => !o)}
          className="h-8 w-8 shrink-0 rounded-[8px] border-2 border-border shadow-sm transition-transform hover:scale-110"
          style={{ backgroundColor: value }}
          aria-label={`Current color: ${value}. Click to open picker.`}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
              handleColorChange(v);
            }
          }}
          className="w-20 rounded-[6px] border border-border px-2 py-1 text-xs font-mono text-text-secondary outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          aria-label={`${label} hex value`}
        />
      </div>

      {/* Swatch grid */}
      {showPicker && (
        <div className="grid grid-cols-6 gap-1.5 rounded-[8px] border border-border bg-bg-card p-2">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch}
              onClick={() => handleColorChange(swatch)}
              className={`h-7 w-7 rounded-[6px] border transition-transform hover:scale-110 ${
                value === swatch ? "border-amber-400 ring-2 ring-amber-400/30" : "border-border"
              }`}
              style={{ backgroundColor: swatch }}
              aria-label={`Color ${swatch}`}
            />
          ))}

          {/* Native color picker */}
          <label className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-[6px] border border-dashed border-text-tertiary hover:border-amber-400">
            <svg className="h-3.5 w-3.5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <input
              type="color"
              value={value}
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Custom color"
            />
          </label>
        </div>
      )}
    </div>
  );
}
