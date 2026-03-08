import type { Recommendation, Urgency, GuidelineClass } from "@/lib/recommendations";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, BookOpen } from "lucide-react";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const urgencyStyles: Record<
  Urgency,
  { border: string; badge: "danger" | "warning" | "success" }
> = {
  high: { border: "border-l-red-500", badge: "danger" },
  moderate: { border: "border-l-amber-500", badge: "warning" },
  watch: { border: "border-l-emerald-500", badge: "success" },
};

const urgencyLabels: Record<Urgency, string> = {
  high: "High Priority",
  moderate: "Moderate",
  watch: "Watch",
};

const classColors: Record<GuidelineClass, string> = {
  I: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  IIa: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  IIb: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  III: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const { title, description, urgency, actions, guideline, guidelineClass, citation } =
    recommendation;
  const styles = urgencyStyles[urgency];

  return (
    <div
      className={`rounded-xl border border-navy-600 bg-navy-800 border-l-4 ${styles.border} p-4`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-slate-200 flex-1">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Badge variant={styles.badge}>{urgencyLabels[urgency]}</Badge>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${classColors[guidelineClass]}`}
          >
            Class {guidelineClass}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed mb-3">
        {description}
      </p>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="space-y-1.5 mb-3">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            Actions
          </span>
          <ul className="space-y-1">
            {actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  size={12}
                  className="text-slate-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  {action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Guideline & Citation */}
      <div className="flex items-start gap-2 border-t border-navy-600/50 pt-2">
        <BookOpen size={12} className="text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] text-slate-500">{guideline}</p>
          <p className="text-[10px] text-slate-600 mt-0.5">{citation}</p>
        </div>
      </div>
    </div>
  );
}
