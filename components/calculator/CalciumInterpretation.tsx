interface CalciumInterpretationProps {
  calciumScore?: number;
  sex?: string;
}

type CalciumSeverity = "severe" | "likely-severe" | "unlikely";

function interpretCalcium(
  score: number,
  sex?: string,
): { severity: CalciumSeverity; label: string } {
  const isFemale =
    sex?.toLowerCase() === "female" || sex?.toLowerCase() === "f";

  if (isFemale) {
    if (score >= 1200) {
      return { severity: "severe", label: "Severe AS" };
    }
    if (score >= 800) {
      return { severity: "likely-severe", label: "Likely Severe AS" };
    }
    return { severity: "unlikely", label: "Unlikely Severe AS" };
  }

  // Male or unknown
  if (score >= 2000) {
    return { severity: "severe", label: "Severe AS" };
  }
  if (score >= 1200) {
    return { severity: "likely-severe", label: "Likely Severe AS" };
  }
  return { severity: "unlikely", label: "Unlikely Severe AS" };
}

const severityColors: Record<CalciumSeverity, { bg: string; border: string; text: string; dot: string }> = {
  severe: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    dot: "bg-red-400",
  },
  "likely-severe": {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  unlikely: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

export function CalciumInterpretation({
  calciumScore,
  sex,
}: CalciumInterpretationProps) {
  if (calciumScore === undefined) return null;

  const result = interpretCalcium(calciumScore, sex);
  const colors = severityColors[result.severity];

  return (
    <div className={`rounded-xl border p-4 ${colors.bg} ${colors.border}`}>
      <h3 className="text-sm font-semibold text-slate-200 mb-2">
        AV Calcium Interpretation
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <span className={`text-sm font-medium ${colors.text}`}>
          {calciumScore} AU &mdash; {result.label}
        </span>
      </div>

      {/* Threshold Reference Table */}
      <div className="rounded-lg border border-navy-600 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-navy-700">
              <th className="text-left px-3 py-1.5 text-slate-400 font-medium">
                Severity
              </th>
              <th className="text-left px-3 py-1.5 text-slate-400 font-medium">
                Male (AU)
              </th>
              <th className="text-left px-3 py-1.5 text-slate-400 font-medium">
                Female (AU)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-600/50">
            <tr className="bg-navy-800/50">
              <td className="px-3 py-1.5 text-red-400">Severe</td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                &ge;2000
              </td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                &ge;1200
              </td>
            </tr>
            <tr className="bg-navy-800/50">
              <td className="px-3 py-1.5 text-amber-400">Likely Severe</td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                1200&ndash;1999
              </td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                800&ndash;1199
              </td>
            </tr>
            <tr className="bg-navy-800/50">
              <td className="px-3 py-1.5 text-emerald-400">Unlikely Severe</td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                &lt;1200
              </td>
              <td className="px-3 py-1.5 text-slate-300 font-mono">
                &lt;800
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-slate-500 mt-2">
        Clavel MA et al. JACC 2014;63:1724-1735 &amp; Heart
        2015;101:1881-1888
      </p>
    </div>
  );
}
