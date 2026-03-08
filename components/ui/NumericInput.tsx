"use client";

import { useState, useEffect } from "react";

interface NumericInputProps {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
  unit?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumericInput({
  label,
  value,
  onChange,
  unit,
  placeholder,
  min,
  max,
  step = 1,
}: NumericInputProps) {
  const [text, setText] = useState(value !== undefined ? String(value) : "");

  useEffect(() => {
    setText(value !== undefined ? String(value) : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setText(raw);
    if (raw === "") {
      onChange(undefined);
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full bg-navy-700 border border-navy-500 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono placeholder:text-slate-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
