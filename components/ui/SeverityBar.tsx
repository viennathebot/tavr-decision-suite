interface SeverityBarProps {
  value: number;
  thresholds: { label: string; min: number; max: number; color: string }[];
  unit?: string;
  label: string;
}

export function SeverityBar({ value, thresholds, unit, label }: SeverityBarProps) {
  const globalMin = Math.min(...thresholds.map((t) => t.min));
  const globalMax = Math.max(...thresholds.map((t) => t.max));
  const range = globalMax - globalMin;
  const position = Math.max(0, Math.min(100, ((value - globalMin) / range) * 100));

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-mono text-slate-300">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {thresholds.map((t, i) => {
          const width = ((t.max - t.min) / range) * 100;
          return (
            <div
              key={i}
              className="h-full"
              style={{ width: `${width}%`, backgroundColor: t.color }}
              title={t.label}
            />
          );
        })}
        <div
          className="absolute top-0 w-0.5 h-full bg-white shadow-[0_0_4px_white]"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="flex justify-between">
        {thresholds.map((t, i) => (
          <span key={i} className="text-[9px] text-slate-500">
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
