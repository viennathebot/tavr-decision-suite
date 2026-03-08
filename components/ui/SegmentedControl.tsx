"use client";

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value?: T;
  onChange: (value: T) => void;
  label?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedControlProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-slate-400">{label}</label>}
      <div className="flex bg-navy-700 rounded-lg p-0.5 border border-navy-500">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              value === opt.value
                ? "bg-gold text-navy-900 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
