interface ResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  severity?: "normal" | "moderate" | "severe";
  subtext?: string;
}

const severityColors: Record<string, string> = {
  normal: "text-emerald-400",
  moderate: "text-amber-400",
  severe: "text-red-400",
};

export function ResultRow({ label, value, unit, severity, subtext }: ResultRowProps) {
  const valueColor = severity ? severityColors[severity] : "text-gold";

  return (
    <div className="flex items-baseline justify-between py-2 border-b border-navy-600/50 last:border-0">
      <div className="flex flex-col">
        <span className="text-xs text-slate-400">{label}</span>
        {subtext && <span className="text-[10px] text-slate-500">{subtext}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono text-sm font-medium ${valueColor}`}>{value}</span>
        {unit && <span className="text-[10px] text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}
