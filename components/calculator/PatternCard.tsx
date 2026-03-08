import type { ClassificationResult, ASPattern } from "@/lib/classification";
import { Badge } from "@/components/ui/Badge";

interface PatternCardProps {
  result: ClassificationResult;
}

const patternColors: Record<
  ASPattern,
  { border: string; bg: string; text: string; badgeVariant: "danger" | "warning" | "gold" | "muted" }
> = {
  "high-gradient": {
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    badgeVariant: "danger",
  },
  "classic-lflg": {
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    badgeVariant: "danger",
  },
  "paradoxical-lflg": {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    badgeVariant: "warning",
  },
  "normal-flow-lg": {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    badgeVariant: "warning",
  },
  moderate: {
    border: "border-gold/40",
    bg: "bg-gold/10",
    text: "text-gold",
    badgeVariant: "gold",
  },
  discordant: {
    border: "border-slate-500/40",
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    badgeVariant: "muted",
  },
};

export function PatternCard({ result }: PatternCardProps) {
  const colors = patternColors[result.pattern];

  return (
    <div
      className={`rounded-xl border p-4 ${colors.border} ${colors.bg}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={`text-sm font-semibold ${colors.text}`}>
          {result.patternName}
        </h3>
        <Badge variant={colors.badgeVariant}>
          {Math.round(result.confidence * 100)}%
        </Badge>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-3">
        {result.description}
      </p>

      {/* Discordance Notes */}
      {result.discordances.length > 0 && (
        <div className="space-y-1.5 mb-3">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            Discordance Notes
          </span>
          {result.discordances.map((note, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-navy-700/50 rounded-lg px-3 py-2"
            >
              <span className="text-amber-400 text-xs mt-0.5 flex-shrink-0">
                &bull;
              </span>
              <span className="text-xs text-slate-400 leading-relaxed">
                {note}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Clavel Classification */}
      {result.clavelClassification && (
        <div className="border-t border-navy-600/50 pt-3">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            Clavel Classification
          </span>
          <div className="mt-1.5">
            <p className="text-xs font-medium text-slate-300">
              {result.clavelClassification.label}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {result.clavelClassification.nextStep}
            </p>
            {result.clavelClassification.calciumInterpretation && (
              <p className="text-xs text-slate-400 mt-1">
                <span className="font-medium">CT Calcium: </span>
                {result.clavelClassification.calciumInterpretation.label}
              </p>
            )}
            {result.clavelClassification.dseInterpretation && (
              <p className="text-xs text-slate-400 mt-1">
                <span className="font-medium">DSE: </span>
                {result.clavelClassification.dseInterpretation}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
