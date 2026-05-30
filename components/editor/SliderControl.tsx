"use client";

interface SliderControlProps {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export function SliderControl({
  label,
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: SliderControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    onChange?.(v);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label htmlFor={`slider-${label}`} className="text-xs font-medium text-text-secondary">{label}</label>
        <span className="text-xs tabular-nums text-text-tertiary">{value}</span>
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="
          h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 outline-none
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-amber-500
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-150
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:bg-amber-500
          [&::-moz-range-thumb]:shadow-sm
          [&::-moz-range-thumb]:hover:scale-110
        "
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
      />
    </div>
  );
}
